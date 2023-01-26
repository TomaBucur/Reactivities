
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivitiyDTO>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivitiyDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                
            }
            public async Task<Result<List<UserActivitiyDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Activity.Date)
                    .ProjectTo<UserActivitiyDTO>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(async => async.HostUsername == request.Username),
                    _ => query.Where(async => async.Date >= DateTime.Now)
                };

                var activities = await query.ToListAsync();

                return Result<List<UserActivitiyDTO>>.Succes(activities);

            }
        }
    }
}