function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className={`section-title ${label ? "mt-3" : ""}`}>{title}</h2>
      {subtitle && <p className={`page-subtitle ${center ? "mx-auto max-w-xl" : "max-w-2xl"}`}>{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
