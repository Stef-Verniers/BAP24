export default function Image({ className, url, imgclass }) {
    return (
        <div className={`img-component ${className}`}>
            <img src={url} className={imgclass} alt="Image" />
        </div>
    );
}