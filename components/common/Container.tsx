const Container = ({ children, locale }: { children: React.ReactNode; locale?: string }) => {
  return (
    <div
      style={{ direction: locale === "fa" ? "rtl" : "ltr" }}
      className="w-full mx-auto max-w-7xl px-6 sm:px-8"
    >
      {children}
    </div>
  );
};

export default Container;
