using CarRentalApi.WebApi.Attachment;
using CarRentalApi.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Controllers
{
    [ApiController]
    public class AttachmentController : ControllerBase
    {
        private readonly IAttachmentService _attachmentService;

        public AttachmentController(IConfiguration configuration, IAttachmentService attachmentService)
        {
            _attachmentService = attachmentService;

            attachmentService.OnStartup(
                configuration["blobConnectionString"], configuration["containerName"], int.Parse(configuration["blobTokenExpirationMinutes"]));
        }

        [HttpGet("attachments")]
        public async Task<IActionResult> GetAttachments()
        {
            var attachments = await _attachmentService.GetBlobsInContainerAsync();
            return Ok(attachments);
        }

        [HttpGet("uploadtoken")]
        [Authorize("carrentalapi.worker")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUploadToken()
        {
            try
            {
                (string token, DateTimeOffset expiresOn) = _attachmentService.GetUploadSastoken();
                var response = new SasTokenResponse
                {
                    SasToken = token,
                    ExpiresOn = expiresOn
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return NotFound(new { Error = e.Message });
            }            
        }

        [HttpGet("downloadtoken")]
        [Authorize("carrentalapi.user")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetDownloadToken()
        {
            try
            {
                (string token, DateTimeOffset expiresOn) = _attachmentService.GetDownloadSastoken();
                var response = new SasTokenResponse
                {
                    SasToken = token,
                    ExpiresOn = expiresOn
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return NotFound(new { Error = e.Message });
            }
        }
    }
}
