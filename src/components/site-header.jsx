import React from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SiteHeader({ children }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const formatLabel = (segment) => {
    if (segment === "v2") return "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  };

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-1">
          <Breadcrumb>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const label = formatLabel(segment);

                if (segment === "v2" && isLast) {
                  return (
                    <React.Fragment key={url}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/v2">Dashboard</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                }

                return (
                  <React.Fragment key={url}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={url}>{label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </div>
    </header>
  );
}
