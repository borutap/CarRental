using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Attachment
{
    public class AttachmentService : IAttachmentService
    {
        private string connectionString;
        private string containerName;
        private int tokenExpirationMinutes;

        private BlobContainerClient containerClient;

        public AttachmentService()
        {
        }

        public void OnStartup(string connectionString, string containerName, int tokenExpirationMinutes)
        {
            this.connectionString = connectionString;
            this.containerName = containerName;
            this.tokenExpirationMinutes = tokenExpirationMinutes;

            var blobServiceClient = new BlobServiceClient(connectionString);
            containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        }

        public async Task<List<string>> GetBlobsInContainerAsync()
        {
            var ret = new List<string>();
            // List all blobs in the container
            await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                ret.Add(blobItem.Name);
            }
            return ret;
        }

        public (string uploadSAStoken, DateTimeOffset expiresOn) GetUploadSAStoken()
        {
            if (!containerClient.CanGenerateSasUri)
            {
                throw new Exception("Container can't generate SasUri");                
            }

            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = containerName,
                Resource = "c",
                ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(tokenExpirationMinutes)
            };

            sasBuilder.SetPermissions(BlobContainerSasPermissions.Write);

            var sasUri = containerClient.GenerateSasUri(sasBuilder);
            return (sasUri.Query.TrimStart('?'), sasBuilder.ExpiresOn);
        }
    }
}
