import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Newton's second law",
        url: "#",
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="text-white bg-linear-to-b from-[#052329] to-black px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg text-white mb-5">Anurag Munda</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="hover:bg-[#1493ac]" asChild>
                                        <a href={item.url}>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}