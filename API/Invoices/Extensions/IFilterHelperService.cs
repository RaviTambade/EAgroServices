

namespace Invoices.Extensions;

public interface IFilterHelperService<T>
{
    List<string> GetPropertyNames();
    List<string> GetEqualProperties();
    List<string> GetRangeProperties();
    List<string> GetDateRangeProperties();
}
