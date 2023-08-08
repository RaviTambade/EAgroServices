using System.Globalization;
using BIService.Models;

namespace BIService.Extensions;

public static class Extensions
{
    public static List<T> AddMissingYears<T>(this List<T> inputList)
        where T : YearRevenue, new()
    {
        int maxyear = inputList.Max(x => x.Year);
        var minyear = inputList.Min(x => x.Year);
        int diff = maxyear - minyear;
        if (inputList.Count == diff + 1)
        {
            return inputList;
        }

        var years = Enumerable.Range(minyear, diff);
        var existingYears = inputList.Select(year => year.Year);

        var missingYears = years.Except(existingYears);

        var missingYearRevenues = missingYears.Select(year => new T { Year = year, Amount = 0 });

        return inputList
            .Concat(missingYearRevenues)
            .OrderBy(yearRevenue => yearRevenue.Year)
            .ToList();
    }

     public static List<T> AddMissingQuarters<T>(this List<T> inputList)
        where T : QuarterRevenue, new()
    {
        if (inputList.Count == 4)
        {
            return inputList;
        }
        var quarters = Enumerable.Range(1, 4);
        var existingQuarters = inputList.Select(quarter => quarter.Quarter);

        var missingQuarters = quarters.Except(existingQuarters);

        var missingQuarterRevenues = missingQuarters.Select(
            quarter => new T { Quarter = quarter, Amount = 0 }
        );

        return inputList
            .Concat(missingQuarterRevenues)
            .OrderBy(quarterRevenue => quarterRevenue.Quarter)
            .ToList();
    }

    public static List<T> AddMissingMonths<T>(this List<T> inputList)
        where T : MonthRevenue, new()
    {
        if (inputList.Count == 12)
        {
            return inputList;
        }
        var months = Enumerable
            .Range(1, 12)
            .Select(
                monthNumber => CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber)
            );

        var existingMonths = inputList.Select(monthRevenue => monthRevenue.Month);

        var missingMonths = months.Except(existingMonths);

        var missingMonthRevenues = missingMonths.Select(
            month => new T { Month = month, Amount = 0 }
        );

        return inputList
            .Concat(missingMonthRevenues)
            .OrderBy(monthRevenue => Array.IndexOf(months.ToArray(), monthRevenue.Month))
            .ToList();
    }

    public static List<T> AddMissingWeeks<T>(this List<T> inputList)
        where T : WeekRevenue, new()
    {
        if (inputList.Count >= 52)
        {
            return inputList;
        }
        var weeks = Enumerable.Range(1, 52);
        var existingWeekNumbers = inputList.Select(weekRevenue => weekRevenue.WeekNumber);

        var missingWeekNumbers = weeks.Except(existingWeekNumbers);

        var missingWeekRevenues = missingWeekNumbers.Select(
            weekNumber => new T { WeekNumber = weekNumber, Amount = 0 }
        );

        return inputList
            .Concat(missingWeekRevenues)
            .OrderBy(weekRevenue => weekRevenue.WeekNumber)
            .ToList();
    }

   
}
