import { TrackingEvent } from "@/entities/history/model/types";

interface TrackingTabProps {
  tracking: TrackingEvent[];
  createdAt: string;
}

export function TrackingTab({ tracking, createdAt }: TrackingTabProps) {
  const groupedTracking = tracking.reduce(
    (acc, event) => {
      const year = new Date(event.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    },
    {} as Record<number, TrackingEvent[]>,
  );

  return (
    <div className="flex flex-col gap-8 pt-4 pb-8">
      {Object.entries(groupedTracking)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, events]) => (
          <div key={year} className="flex flex-col gap-6">
            <h3 className="text-heading-3 text-gray-900 font-bold px-2">
              {year}년
            </h3>
            <div className="relative flex flex-col gap-10 pl-6 ml-4 border-l border-gray-400 border-dashed">
              {events
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((event, index) => {
                  const eventDate = new Date(event.date);
                  const createdDate = new Date(createdAt);
                  const diffTime = eventDate.getTime() - createdDate.getTime();
                  const diffDays = Math.max(
                    0,
                    Math.floor(diffTime / (1000 * 60 * 60 * 24)),
                  );

                  return (
                    <div key={index} className="relative flex flex-col">
                      <div
                        className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-primary-400 ${
                          index === 0 ? "bg-primary-400" : "bg-gray-200"
                        }`}
                      />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-body-6 text-gray-800">
                            {eventDate.getMonth() + 1}.{eventDate.getDate()}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-300 rounded text-label-3 text-gray-800 font-bold">
                            D+{diffDays}
                          </span>
                        </div>
                        <h4 className="text-heading-6 text-gray-900 font-bold flex items-center gap-1">
                          {event.isResolved ? "해결 🎉" : "미해결 🔒"}
                        </h4>
                        <p className="text-body-6 text-gray-700">
                          {event.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </div>
  );
}
