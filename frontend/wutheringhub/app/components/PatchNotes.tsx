"use client";

import React from "react";

type ExternalProps = {
    src: string
    height?: string
    title?: string
}

export default function ExternalSite({src, height = "80vh", title = "Patch Notes"}: ExternalProps) {
    return (
        <div className="w-full overflow-auto border rounded-lg">
            <iframe
                src={src}
                title={title}
                className="w-full border-0"
                style={{ height }}
      />
        </div>
    )
}