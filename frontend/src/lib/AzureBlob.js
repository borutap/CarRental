import { BlobServiceClient } from '@azure/storage-blob';
// TODO tu bedzie token tylko do czytania/pobierania
// on moze wszystko, raczej token juz jest przedawniony, wazny do 13.01.2022 23:59
const containerName = `testrentalcontainer`;
const storageAccountName = 'testrentalstorageaccount';

export const getUploadToken = async () => {
    try {
        // endpoint dodam pozniej (jest juz zrobiony)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };
        const response = await fetch('https://localhost:44329/uploadtoken', requestOptions);
        const data = await response.json();
        console.log("Got uploadSasToken");
        console.log(data);
        return data.uploadSasToken;
    } catch (e) {
        alert('Could not fetch upload token: ' + e.message);
    }
};

const sanitizeFileName = (fileName, rentId) => {
    const extension = fileName.split('.').at(-1);
    return `${rentId}.${extension}`;
};

// po rentId bedziemy szukali pliku
export const uploadFilesToBlob = async (files, rentId) => {
    if (!files) {
        alert('uploadFileToBlob: Bad argument');
        return;
    }
    
    const sasToken = await getUploadToken();
    const containerClient = getClient(sasToken);

    //upload files
    for (const file of files) {
        const newName = sanitizeFileName(file.name, rentId);
        try {
            await createBlobInContainer(containerClient, file, newName);
            console.log(`Uploaded ${newName}`);
        } catch (e) {
            alert("Couldn't upload data, probably bad token: " + e.message);
        }        
    }
};

// bedzie przyjmowal sasToken
export const getClient = (sasToken) => {
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    return containerClient;
};

export const createBlobInContainer = async (
    containerClient,
    file,
    customFileName
) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(customFileName);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
};

export const getBlobsUrlsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobUrls.push(
            `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
        );
    }

    return returnedBlobUrls;
};

export const getBlobsNamesInContainer = async (containerClient) => {
    const returnedBlobNames = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        // if image is public, just construct URL
        returnedBlobNames.push(blob.name);
    }

    return returnedBlobNames;
};

export const downloadBlobFromContainer = async (containerClient, fileName) => {
    const blobClient = containerClient.getBlockBlobClient(fileName);
    // Download and convert a blob to a string
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await blobToString(
        await downloadBlockBlobResponse.blobBody
    );
    console.log('Downloaded blob content', downloaded);
};

export const downloadBlob = async (containerClient, fileName) => {
    const blobClient = containerClient.getBlockBlobClient(fileName);
    // Download and convert a blob to a string
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await downloadBlockBlobResponse.blobBody;
    return downloaded;
};

const blobToString = async (blob) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
            resolve(ev.target.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
    });
};
