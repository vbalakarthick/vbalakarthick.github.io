interface TimelineItemProps {
  title: string;
  organization: string;
  period: string;
  description: string[] | string;
  type: "list" | "paragraph";
  icon?: string;
}

export function TimelineItem({ 
  title, 
  organization, 
  period, 
  description, 
  type,
  icon
}: TimelineItemProps) {
  return (
    <div className="relative">
      <div className="absolute -left-[41px] mt-1.5 w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-900"></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-heading font-bold mb-1">{title}</h4>
        <div className="flex flex-wrap items-center text-sm mb-3">
          <span className="font-medium text-blue-600 dark:text-blue-400">{organization}</span>
          <span className="mx-2 text-gray-500">|</span>
          <span className="text-gray-600 dark:text-gray-400">{period}</span>
        </div>
        
        {type === "list" && Array.isArray(description) && (
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        
        {type === "paragraph" && (
          <div className={`${icon ? "flex items-center" : ""}`}>
            {icon && (
              <img src={icon} alt={title} className="w-10 h-10 mr-3" />
            )}
            <p className="text-gray-700 dark:text-gray-300">
              {description as string}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
