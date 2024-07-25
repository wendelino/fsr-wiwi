"use client";  

export default function CreativeLayout({blocks}: {blocks: any}) { 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Unser Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blocks.map((block: any, index: number) => (
          <div
            key={block.id}
            className="p-6 bg-white rounded-lg shadow-md fade-in"
            style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}
          >
            <h2 className="text-xl font-semibold mb-4">{block.title}</h2>
            <p>{block.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
