using Microsoft.EntityFrameworkCore;

namespace Transflower.Invoices.Extensions;

public class PagedList<T> : List<T>
{
    private const int pageSize = 2;
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int TotalCount { get; private set; }
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PagedList(List<T> items, int count, int totalpages, int pageNumber)
    {
        TotalCount = count;
        CurrentPage = pageNumber;
        TotalPages =totalpages;
        AddRange(items);
    }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber = 1)
    {
        var count = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
    
        if (pageNumber <= 0 || (pageNumber> totalPages && totalPages!=0))
        {
            pageNumber = 1;
        }
         var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
       
        return new PagedList<T>(items, count, totalPages, pageNumber);
    }
}
