import React from 'react'

const data = [ 
{ 
    section: "Today", 
    items: [ 
        { 
            type: "like", 
            user: "Alex Chen", 
            time: "3h", 
            post: "Writing online is thinking in public", 
            meta: "May 12 · 8 min read",
        }, 
        { 	
            type: "restack", 
            user: "Priya Patel", 
            time: "5h", 
            post: "Writing online is thinking in public", 
            meta: "May 12 · 8 min read", 
        }, 
        { 
            type: "reply", 
            user: "Noah Williams", 
            time: "6h", 
            content: "Totally agree with this! The part about showing up even when you don't feel ready really hit home.", 
        }, 
    ], 
}, 
    { 
        section: "Yesterday", 
        items: [ 
            { 
                type: "subscribe", 
                user: "Emma Lee", 
                time: "Yesterday", 
            }, 
            { 
                type: "like", 
                user: "David Kim", 
                time: "Yesterday", 
                post: "The creative process is non-linear", 
                meta: "May 10 · 6 min read", 
            }, 
            { 
                type: "reply", 
                user: "Maria Garcia", 
                time: "Yesterday", 
                content: "This framework is so helpful—saving this one!", 
            }, 
        ], 
    }, 
];

const Icon = ({ type }) => { 
    const map = { 
    like: "❤️", 
    restack: "🔁", 
    reply: "💬", 
    subscribe: "⭐", 
    }; 
    return <span className="text-xl">{map[type] || "🔔"}</span>; 
};



const NotificationItem = ({item}) => {
  return (
    <div className="w-full min-w-0 flex-1 space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f] p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.95)] sm:p-5 lg:p-6 mb-6 "> 
        <div className="flex gap-4 p-4 border-b bg-[#090909]">
            <Icon type={item.type} /> 
            <div className="flex-1"> 
                <div className="text-sm text-gray-600">
                    <span className="font-semibold text-orange-500">
                        {item.user}</span>{" "} 
                    {item.type === "like" && "liked your post"} 
                    {item.type === "restack" && "restacked your post"} 
                    {item.type === "reply" && "replied to your post"} 
                    {item.type === "subscribe" && "subscribed to your blog"} 
                    {item.type === "note" && "posted a note"} 
                </div>

{item.content && (
      <div className="mt-2 text-gray-500  p-3 rounded-lg text-sm">
        {item.content}
      </div>
    )}

    {item.post && (
      <div className="mt-2">
        <div className="font-medium ">{item.post}</div>
        <div className="text-xs text-gray-500">{item.meta}</div>
      </div>
    )}
  </div>

  <div className="text-xs text-gray-400">{item.time}</div>

        </div>
</div>

); };

export default function NotificationsUI() { 
    return ( 
        <div className="max-w-3xl mx-auto bg-black rounded-2xl shadow mt-10">
            <div className="mt-2 p-5">
              <h2 className="mt-2 text-3xl font-semibold">Activity</h2>
              <p className="text-grey-200 text-sm">A feed of likes and replies</p>
            </div> 
            <div className="flex gap-10 p-4 border-b text-sm text-gray-500 "> 
            
                <span className="font-semibold text-orange-500">All</span> 
                <span>Likes</span> 
                <span>Replies</span> 
                <span>Restacks</span> 
                <span>Subscriptions</span> 
            </div>

{data.map((section, idx) => (
    <div key={idx}>
      <div className="px-4 py-2 text-xs text-gray-400 uppercase">
        {section.section}
      </div>

      {section.items.map((item, i) => (
        <NotificationItem key={i} item={item} />
      ))}
    </div>
  ))}

  <div className="p-4 flex justify-center">
    <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
      Load more
    </button>
  </div>
</div>

  )
      }
