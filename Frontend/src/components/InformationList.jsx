import "./InformationList.css";
import Menu from "./ui/Menu";
import ExpandableText from "./ui/ExpandableText";

export default function InformationList({ info = [], loading, error, titleKey }) {
    if (loading) return <p className="loading-text">Loading information...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (info.length === 0) return <p className="loading-text">No information to display for this type.</p>;

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
                        ) : (
                            <ExpandableText text={item.value} />  
                        )}
                    </div>

                    <Menu items={menuItems(item)} orientation="vertical" className="w-32" />
                </div>
            ))}
        </div>
    );
}
