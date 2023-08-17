using Newtonsoft.Json;
namespace Invoices.Extensions;

public static class HttpResponseExtensions
{
    public static void AddPaginationHeader<T>(this HttpResponse response, PagedList<T> collections)
    {
        if (collections != null)
        {
            var metadata = new
            {
                TotalCount = collections.TotalCount,
                CurrentPage = collections.CurrentPage,
                TotalPages = collections.TotalPages,
                HasNext = collections.HasNext,
                HasPrevious = collections.HasPrevious
            };
            
            response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
        }
    }
}
