using GoodsCollections.Models;
using GoodsCollections.Repositories.Interfaces;
using GoodsCollections.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace GoodsCollections.Repositories
{
    public class GoodsCollectionRepository : IGoodsCollectionRepository
    {
        private readonly IConfiguration _configuration;

        public GoodsCollectionRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<GoodsCollection>> GetAll(int collectionCenterId)
        {
            try
            {
                using (var context = new GoodsCollectionContext(_configuration))
                {
                    var collections = await context.GoodsCollections.Where(c => c.CollectionCenterId == collectionCenterId).ToListAsync();
                    if (collections == null)
                    {
                        return null;
                    }
                    return collections;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

          public async Task<GoodsCollection> GetById(int collectionId)
        {
            try
            {
                using (var context = new GoodsCollectionContext(_configuration))
                {
                    var collection = await context.GoodsCollections.FindAsync(collectionId);

                    if (collection == null)
                    {
                        return null;
                    }

                    return collection;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Insert(GoodsCollection collection)
        {
            try
            {
                bool status = false;
                using (var context = new GoodsCollectionContext(_configuration))
                {
                    await context.GoodsCollections.AddAsync(collection);
                    int rowaAffected = context.SaveChanges();
                    if (rowaAffected == 1)
                    {
                        status = true;
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Update(GoodsCollection collection)
        {
            try
            {
                bool status = false;
                using (var context = new GoodsCollectionContext(_configuration))
                {
                    var oldcollection = await context.GoodsCollections.FindAsync(collection.Id);
                    if (oldcollection is not null)
                    {
                        oldcollection.FarmerId = collection.FarmerId;
                        oldcollection.CropId = collection.CropId;
                        oldcollection.ContainerType = collection.ContainerType;
                        oldcollection.Quantity = collection.Quantity;
                        oldcollection.Weight = collection.Weight;
                        oldcollection.CollectionDate = collection.CollectionDate;
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }

                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int collectionId)
        {
            try
            {
                bool status = false;
                using (var context = new GoodsCollectionContext(_configuration))
                {
                    var collection = await context.GoodsCollections.FindAsync(collectionId);
                    if (collection is not null)
                    {
                        context.GoodsCollections.Remove(collection);
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
