import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="fixed bottom-5 end-5 z-10 ">
        <ThemeToggleButton
          shape="circle"
          color="ghost"
          className={
            "border border-base-content/10 text-base-content/70 hover:bg-base-content/10"
          }
        />
      </div>
    </>
  );
}
