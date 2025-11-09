import "./InformationList.css";
import Menu from "../ui/Menu";
import ExpandableText from "../ui/ExpandableText";
import { useState } from "react";
import HtmlViewerModal from "./HtmlViewer";
import PdfViewerModal from "./PdfViewer";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function InformationList({ info = [], loading, error, titleKey }) {
    const [htmlItem, setHtmlItem] = useState(null);
    const [pdfItem, setPdfItem] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
    if (loading) return <p className="loading-text">Loading information...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (info.length === 0)
        return <p className="loading-text">No information to display for this type.</p>;

    const menuItems = (item) => [
        { label: "Edit", onClick: () => console.log("Edit", item) },
        { label: "Delete", onClick: () => console.log("Delete", item) },
    ];

    return (
        <div className="info-list">
            {info.map((item, index) => (
                <div
                    key={index}
                    className={`info-item degree-${item.degree} flex items-center justify-between gap-4`}
                >
                    <div>
                        {item[titleKey] && <h4 className="info-title">{item[titleKey]}</h4>}

                        {item.infoType === "link" ? (
                            <a
                                href={item.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="info-link"
                            >
                                {item.value}
                            </a>
                        ) : item.infoType === "html" ? (
                            <button
                                onClick={() => setHtmlItem(item)}
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                Open HTML
                            </button>

                        ) : item.infoType === "pdf" ? (
                            <button
                                onClick={() => setPdfItem(item)}
                                className="text-blue-600 underline min-w-full hover:text-blue-800"
                            >
                                Open PDF
                            </button>
                        ) :

                            (
                                <ExpandableText text={item.value} />
                            )}
                    </div>

                    <Menu items={menuItems(item)} orientation="vertical" className="w-32" />
                </div>
            ))}

            {/* Render HTML modal if an item is selected */}
            {htmlItem && (
                <HtmlViewerModal
                    onClose={() => setHtmlItem(null)}
                    src={`${API_URL}${htmlItem.value}`}
                />
            )}
            {pdfItem && (
                <PdfViewerModal
                    onClose={() => setPdfItem(null)}
                    src={`${API_URL}${pdfItem.value}`}
                />
            )}
        </div>
    );
}
