import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import formatJsonDate from '@lib/formatJsonDate';
import { downloadBlob } from '@lib/AzureBlob';
import { saveAs } from 'file-saver';

import styles from './HistoryItem.module.scss';
import { OkIcon } from '../OkIcon/OkIcon';
import { NoIcon } from '../NoIcon/NoIcon';
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

export const HistoryItem = ({
    imageUrl,
    rentId,
    brandName,
    modelName,
    rentStart,
    rentEnd,
    year,
    power,
    capacity,
    description,
    returnDescription,
    odometerValue,
    returnTime,
    attachments,
    blobClient
}) => {
    const [expanded, setExpanded] = useState(false);
    const [att, setAtt] = useState([]);

    useEffect(() => {
        const tab = attachments.filter((fileName) => {
            return fileName.startsWith(rentId);
        });
        setAtt(tab);
    }, [attachments]);

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imgContainer}>
                    <img draggable={false} src={imageUrl} />
                </div>
                <div className={styles.topRight}>
                    <div className={styles.topTextContainer}>
                        {brandName + ' ' + modelName}
                    </div>
                    <div>
                        From {formatJsonDate(rentStart)}
                    </div>
                    <div>
                        Until {formatJsonDate(rentEnd)}
                    </div>
                </div>
            </div>
            <div className={styles.midContainer}>
                {checkDate(returnTime) ? (
                    <div className={styles.returned}>
                        <OkIcon />
                        Returned ({formatJsonDate(returnTime)})
                    </div>
                ) : (
                    <div className={styles.notReturned}>
                        <NoIcon />
                        Not Returned
                    </div>
                )}
            </div>
            <div className={styles.bottomContainer}>            
                {expanded && (
                    <>
                        <div className={styles.bottomCarDetails}>
                            <VehicleDetails
                                year={year}
                                power={power}
                                capacity={capacity}
                                description={description}
                            />
                        </div>
                        <div className={styles.bottomDownload}>
                            <Attachments attachments={att} blobClient={blobClient}/>
                            <div>
                                {returnDescription}
                            </div>
                            <div>
                                <u>Odometer value</u>: {odometerValue}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div
                className={styles.expandToggle}
                onClick={() => setExpanded(!expanded)}
            >
                {'Show ' + (expanded ? 'less' : 'more')}
                <div
                    className={classNames(styles.expandIcon, {
                        [styles.expanded]: expanded,
                    })}
                >
                    <ArrowIcon />
                </div>
            </div>
        </div>
    );
};

const checkDate = (returnTime) => {
    return returnTime === null ? false : true;
};

const Attachments = ({ attachments, blobClient }) => {
    
    const getPleasantName = (fileName) => {
        if (fileName.endsWith(".pdf")) {
            return "Documents.pdf";
        } else {
            const extension = fileName.split('.').at(-1);
            return `Image.${extension}`;
        }
    }
    
    const downloadBlobOnClick = async (fileName) => {
        const blob = await downloadBlob(blobClient, fileName);
        saveAs(blob, fileName);
    }

    return (
        <>
            {attachments.map((fileName, index) => {
                return (
                    <p
                        key={index}
                        onClick={() => downloadBlobOnClick(fileName)}
                    >
                        {getPleasantName(fileName)}
                    </p>
                );
            })}
        </>
    );
};


