using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Attachment
{
    public interface IAttachmentService
    {
        void OnStartup(string connectionString, string containerName, int tokenExpirationMinutes);
        Task<List<string>> GetBlobsInContainerAsync();

        (string uploadSAStoken, DateTimeOffset expiresOn) GetUploadSAStoken();
    }
}
