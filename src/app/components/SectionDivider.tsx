'use client';

export default function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden" aria-hidden>
      <svg
        className="block w-full h-16 text-teal-50"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,0V46.29c47.79,22,103.59,29.05,158,17,70.36-15.65,136.33-57,206.8-73C438.64-26.17,512.34,6.36,583,33.27c69.28,26.35,138.5,53.67,209,59.78,66.9,5.75,130.5-12.41,193-31.52,66.42-20.2,132.13-40.42,215-42.16V0Z" fill="currentColor" />
      </svg>
    </div>
  );
}


