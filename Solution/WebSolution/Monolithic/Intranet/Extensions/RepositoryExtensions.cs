using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using Domain.Entities.Attributes;
using MySql.Data.MySqlClient;

namespace Intranet.Extensions;

public static class RepositoryExtensions
{
    public static async Task<IEnumerable<T>> FindAllAsync<T>(this IRepository<T> repository)
        where T : class
    {
        return await ExecuteReaderAsync<T>(repository, $"SELECT * FROM {GetTableName<T>()}");
    }

    public static async Task<IEnumerable<T>> FindAllByIdAsync<T>(
        this IRepository<T> repository,
        int id
    )
        where T : class
    {
        return await ExecuteReaderAsync<T>(
            repository,
            $"SELECT * FROM {GetTableName<T>()} WHERE id = @Id",
            new { Id = id }
        );
    }

    public static async Task<T> FindByIdAsync<T>(this IRepository<T> repository, int id)
        where T : class
    {
        var result = await ExecuteReaderAsync<T>(
            repository,
            $"SELECT * FROM {GetTableName<T>()} WHERE id = @Id",
            new { Id = id }
        );
        return result.FirstOrDefault();
    }

    public static async Task AddAsync<T>(this IRepository<T> repository, T entity)
        where T : class
    {
        await ExecuteNonQueryAsync(repository, BuildInsertQuery<T>(), entity);
    }

    public static async Task DeleteAsync<T>(this IRepository<T> repository, int id)
        where T : class
    {
        await ExecuteNonQueryAsync(
            repository,
            $"DELETE FROM {GetTableName<T>()} WHERE id = @Id",
            new { Id = id }
        );
    }

    public static async Task UpdateAsync<T>(this IRepository<T> repository, T entity)
        where T : class
    {
        await ExecuteNonQueryAsync(repository, BuildUpdateQuery<T>(), entity);
    }

    private static async Task<IEnumerable<T>> ExecuteReaderAsync<T>(
        IRepository<T> repository,
        string query,
        object parameters = null
    )
        where T : class
    {
        using (var connection = new MySqlConnection(repository.ConnectionString))
        {
            await connection.OpenAsync();

            using (var command = new MySqlCommand(query, connection))
            {
                System.Console.WriteLine(query);
                try
                {
                    if (parameters != null)
                    {
                        AddParameters(command, parameters);
                    }

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        var entities = new List<T>();
                        while (await reader.ReadAsync())
                        {
                            var entity = MapEntityFromReader<T>(reader);
                            entities.Add(entity);
                        }
                        return entities;
                    }
                }
                catch (MySqlException ex)
                {
                    throw new Exception("Error executing database query.", ex);
                }
            }
        }
    }

    private static async Task ExecuteNonQueryAsync<T>(
        IRepository<T> repository,
        string query,
        object parameters = null
    )
        where T : class
    {
        using (var connection = new MySqlConnection(repository.ConnectionString))
        {
            await connection.OpenAsync();
            using (var command = new MySqlCommand(query, connection))
            {
                System.Console.WriteLine(query);
                if (parameters != null)
                    AddParameters(command, parameters);

                await command.ExecuteNonQueryAsync();
            }
        }
    }

    private static void AddParameters(MySqlCommand command, object parameters)
    {
        foreach (var prop in parameters.GetType().GetProperties())
        {
            command.Parameters.AddWithValue($"@{prop.Name}", prop.GetValue(parameters));
        }
    }

    private static int GetEntityId<T>(T entity)
        where T : class
    {
        var property = typeof(T).GetProperty("Id");
        if (property != null)
            return (int)property.GetValue(entity);
        else
            throw new ArgumentException("Entity must have an 'Id' property.");
    }

    private static T MapEntityFromReader<T>(IDataReader reader)
        where T : class
    {
        var entity = Activator.CreateInstance<T>();
        var propertyNames = typeof(T).GetProperties().Select(p => p.Name).ToList();
        //System.Console.WriteLine($"Property Names: {string.Join(", ", propertyNames)}");
        for (int i = 0; i < reader.FieldCount; i++)
        {
            //  System.Console.WriteLine($"{reader.GetName(i)}: {reader.GetValue(i)}");
            // System.Console.WriteLine($"Field Name: {reader.GetName(i)}");
            var propertyName = reader.GetName(i);
            if (propertyNames.Contains(propertyName, StringComparer.OrdinalIgnoreCase))
            {
                var prop = propertyNames.FirstOrDefault(
                    p => p.Contains(propertyName, StringComparison.OrdinalIgnoreCase)
                );
                var property = typeof(T).GetProperty(prop);
                if (property != null)
                {
                    var value = reader.GetValue(i);
                    property.SetValue(entity, value);
                    //    System.Console.WriteLine($"{propertyName}: {value}");
                }
            }
        }
        return entity;
    }

    private static string BuildInsertQuery<T>()
        where T : class
    {
        var columns = string.Join(", ", typeof(T).GetProperties().Select(p => p.Name));
        var values = string.Join(", ", typeof(T).GetProperties().Select(p => $"@{p.Name}"));
        return $"INSERT INTO {GetTableName<T>()} ({columns}) VALUES ({values})";
    }

    private static string BuildUpdateQuery<T>()
        where T : class
    {
        var setClause = string.Join(
            ", ",
            typeof(T)
                .GetProperties()
                .Where(p => p.Name != "Id")
                .Select(p => $"{p.Name} = @{p.Name}")
        );
        return $"UPDATE {GetTableName<T>()} SET {setClause} WHERE id = @Id";
    }

    private static string GetTableName<T>()
    {
        var tableAttribute = (TableAttribute)
            Attribute.GetCustomAttribute(typeof(T), typeof(TableAttribute));
        if (tableAttribute != null)
        {
            return tableAttribute.TableName;
        }
        else
        {
            return typeof(T).Name;
        }
    }
}
