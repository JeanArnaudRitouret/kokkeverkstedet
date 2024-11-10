import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';

console.log('workerSrc path:', `${process.env.PUBLIC_URL}/pdf.worker.min.js`);
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;



const Content = () => {
    const { moduleId } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        setLoading(true);  // Start loading
        axios.get(`http://127.0.0.1:8000/platform_old/api/content/${moduleId}/`)
            .then(response => {
                setContent(response.data[0]);
                setLoading(false);  // Data fetched successfully, stop loading
            })
            .catch(error => {
                console.error('Error fetching content for module with id ${moduleId}:', error);
                setError('Content not found or there was an error fetching the content.');
                setLoading(false);  // Stop loading on error
            });
    }, [moduleId]);

    useEffect(() => {
        // Fetch HTML content if the module type is 'page' and internal_path is defined
        if (content && content.module_type === 'page' && content.media_internal_path) {
            axios.get(content.media_internal_path)
                .then(response => {
                    setHtmlContent(response.data);
                })
                .catch(error => {
                    console.error('Error loading HTML content:', error);
                });
        }
    }, [content]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Check if content.module_type is 'video'
    const isPage = content.module_type === 'page';
    const isVideo = content.module_type === 'video';
    const isFile = content.module_type === 'fichier';

    return (
        <div>
            {/* ------------ TO BE REMOVED ------------  */}
            <h2>{content.title}</h2>
            <p><strong>Module Type:</strong> {content.module_type || 'No module type available'}</p>
            <p><strong>Content Type:</strong> {content.type || 'No content type available'}</p>
            <p><strong>Is Video:</strong> {isVideo ? 'true' : 'false' }</p>
            <p><strong>Is Page:</strong> {isPage ? 'true' : 'false' }</p>
            <p><strong>Is File:</strong> {isFile ? 'true' : 'false' }</p>
            <p><strong>htmlContent:</strong> {htmlContent ? 'true' : 'false' }</p>
            <p><strong>media_internal_path:</strong> {content.media_internal_path}</p>
            {/* ------------ TO BE REMOVED ------------  */}

            {isVideo ? (
                <video controls width="600">
                    <source src={content.media_internal_path} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : isPage && htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : isFile ? (
                <Document
                    file={content.media_internal_path}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(error) => {
                        console.error('Error while loading document:', error);
                    }}
                    >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>

            ) : (
                <p>
                    a
                </p>
            )}
        </div>
    );

};

export default Content;
