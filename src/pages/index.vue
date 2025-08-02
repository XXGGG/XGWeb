<template>
    <div class="Home">

        <!-- 搜索框 -->
        <div v-if="setting.setting.SE != '' && !setting.setting.simplify"
            class="form-control w-full max-w-md mx-auto relative  items-center" mt-100px>
            <Input id="search" type="text" placeholder="" class=" p-5 pl-10" v-model="searchQuery"
                @keyup.enter="performSearch" />
            <DropdownMenu>
                <DropdownMenuTrigger class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <div :class="SEList[setting.setting.SE]?.icon" class="size-6 text-muted-foreground"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem v-for="item in searchEngineOptions" :key="item.value"
                        @click="setting.setting.SE = item.value"
                        :class="{ 'bg-accent': setting.setting.SE === item.value }">
                        <div :class="item.icon" class="size-4 mr-2"></div>
                        {{ item.label }}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div v-if="setting.setting.SE != '' && setting.setting.simplify" h-100vh flex justify-center items-center>
            <div class="form-control w-full max-w-xl ma relative  items-center">
                <Input id="search" type="text" placeholder="" class="p-5 pl-10" v-model="searchQuery"
                    @keyup.enter="performSearch" />
                <DropdownMenu>
                    <DropdownMenuTrigger class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <div :class="SEList[setting.setting.SE]?.icon" class="size-6 text-muted-foreground"></div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem v-for="item in searchEngineOptions" :key="item.value"
                            @click="setting.setting.SE = item.value"
                            :class="{ 'bg-accent': setting.setting.SE === item.value }">
                            <div :class="item.icon" class="size-4 mr-2"></div>
                            {{ item.label }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <!-- Web 快捷方式区域 -->
        <Transition name="show">
            <div class="main" v-if="setting.setting.showwebsites && !setting.setting.simplify">
                <div class="web-container">
                    <div class="box" v-for="(site, index) in setting.websites.list" :key="index"
                        @click="goToWebsite(site.url)">
                        <div class="box_ico">
                            <div p-4 m-1 :class="site.icon"></div>
                        </div>
                        <div class="title" v-if="setting.setting.showname">{{ site.name }}</div>
                    </div>
                </div>
            </div>
        </Transition>


        <!-- XGTools -->
        <!-- <Transition name="show">
            <div class="main" v-if="setting.setting.showxgtools && !setting.setting.simplify">
                <div class="tools-container">
                    <div class="box" v-for="i in filteredTools" @click="go_router(i.url)">
                        <div class="box_ico">
                            <div p-4 m-1 :class="i.icon"></div>
                        </div>
                        <div class="title" v-if="setting.setting.showname">{{ i.name }}</div>
                    </div>
                </div>
            </div>
        </Transition> -->

        <!-- Dock -->
        <Transition name="show">
            <div class="DockAera" v-if="setting.setting.simplify">
                <div class="Dock">
                    <div class="Dock_ico" cursor-pointer :class="site.icon"
                        v-for="(site, index) in setting.websites.list" :key="index" @click="goToWebsite(site.url)">
                    </div>
                    <Separator orientation="vertical" />
                    <div class="Dock_ico" cursor-pointer :class="i.icon" v-for="i in filteredTools"
                        @click="go_router(i.url)"></div>
                </div>
            </div>
        </Transition>

        <!-- 底部设置 -->
        <Sheet>
            <SheetTrigger class="foot_nav" px-4>
                <div icon-btn i-tabler-settings></div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <!-- <SheetTitle>Are you absolutely sure?</SheetTitle> -->
                    <SheetDescription>
                        <Tabs default-value="settings" class="w-full">
                            <TabsList class="grid w-full grid-cols-3">
                                <TabsTrigger v-for="item in navigationItems" :key="item.value" :value="item.value">
                                    {{ item.label }}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="settings">
                                <!-- 搜索引擎选择 -->
                                <div class="setting-item">
                                    <Label for="SESelect">搜索引擎：</Label>
                                    <Select v-model="setting.setting.SE" id="SESelect">
                                        <SelectTrigger class="w-[200px]">
                                            <SelectValue :placeholder="setting.setting.SE"
                                                v-model="setting.setting.SE" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="item in searchEngineOptions" :value="item.value">
                                                {{ item.label }}
                                                <!-- {{ item.value  }} -->
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator class="my-4" />
                                <!-- 其他功能选择 -->
                                <div class="setting-item">
                                    <span>显示网站</span>
                                    <Switch v-model="setting.setting.showwebsites" />
                                </div>
                                <div class="setting-item">
                                    <span>显示XGTools</span>
                                    <Switch v-model="setting.setting.showxgtools" />
                                </div>
                                <div class="setting-item">
                                    <span>显示名称</span>
                                    <Switch v-model="setting.setting.showname" />
                                </div>
                                <div class="setting-item">
                                    <span>简化</span>
                                    <Switch v-model="setting.setting.simplify" />
                                </div>
                            </TabsContent>
                            <TabsContent value="websites">
                                websites
                            </TabsContent>
                            <TabsContent value="xgtools">
                                xgtools
                            </TabsContent>
                        </Tabs>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    </div>
</template>

<script setup lang='ts'>
// import { ref, reactive, computed, watch } from 'vue';

// 或者更安全的写法，防止初始化时 setting 尚未加载
onMounted(() => {
    if (setting.value.setting.SE == "") {
        setting.value.setting.SE = "Google";
        setting.value.setting.showwebsites = true;
        setting.value.setting.showxgtools = true;
    }
});

// 导航
const go_router = (url: string) => {
    window.location.href = url
}

//网站
const goToWebsite = (url: string) => {
    window.open(url, '_blank');
}

// 筛选显示启用的工具
const filteredTools = computed(() => {
    return setting.value.xgtools.list.filter(tool => tool.enabled);
});

// 搜索相关
const searchQuery = ref('');

const SEList: any = {
    "Google": {
        "name": "Google",
        "url": "https://www.google.com/search?q=",
        "icon": "i-uim-google"
    },
    "Bing": {
        "name": "Bing",
        "url": "https://cn.bing.com/search?q=",
        "icon": "i-simple-icons-microsoftbing"
    },
    "Baidu": {
        "name": "百度",
        "url": "https://www.baidu.com/s?wd=",
        "icon": "i-ri-baidu-line"
    },
    "Sogou": {
        "name": "搜狗",
        "url": "https://www.sogou.com/web?query=",
        "icon": "i-cib-sogou"
    },
    "Yandex": {
        "name": "Yandex",
        "url": "https://www.yandex.com/search/?text=",
        "icon": "i-gravity-ui-logo-yandex"
    }
};


// 将 SE 对象的键转换为选项数组
const searchEngineOptions = computed(() => {
    return Object.keys(SEList).map(key => ({
        label: SEList[key].name,
        value: key,
        icon: SEList[key].icon
    }));
});



// 使用 useLocalStorage 创建响应式的本地存储变量
const setting = useLocalStorage('Settings', {
    setting: {
        SE: "",
        fastswitch: false,
        showwebsites: false,
        showxgtools: false,
        showname: true,
        simplify: false,
    },
    websites: {
        list: [
            {
                name: "GitHub",
                url: "https://github.com",
                icon: "i-ri-github-line"
            },
            {
                name: "YouTube",
                url: "https://youtube.com",
                icon: "i-ri-youtube-line"
            },
            {
                name: "哔哩哔哩",
                url: "https://bilibili.com",
                icon: "i-ri-bilibili-line"
            },
            {
                name: "微博",
                url: "https://weibo.com",
                icon: "i-ri-weibo-line"
            },
            {
                name: "Figma",
                url: "https://figma.com",
                icon: "i-solar-figma-linear"
            },
            {
                name: "X",
                url: "https://X.com",
                icon: "i-proicons-x-twitter"
            },
            {
                name: "instagram",
                url: "https://instagram.com",
                icon: "i-mynaui-brand-instagram"
            },
            {
                name: "知乎",
                url: "https://zhihu.com",
                icon: "i-ri-zhihu-fill"
            },
            {
                name: "小红书",
                url: "https://www.xiaohongshu.com/",
                icon: "i-arcticons-xhs"
            },
            {
                name: "抖音",
                url: "https://www.douyin.com/",
                icon: "i-ic-round-tiktok"
            }
        ]
    },
    xgtools: {
        list: [
            {
                name: "简繁字转换",
                url: "/switch-font",
                icon: "i-solar-notes-bold-duotone",
                enabled: true,
            },
            {
                name: "魔方秒表",
                url: "/stopwatch",
                icon: "i-solar-stopwatch-bold-duotone",
                enabled: true,
            },
        ]
    }
})

// 执行搜索
const performSearch = () => {
    let se = setting.value.setting.SE
    if (searchQuery.value.trim()) {
        const searchUrl = `${SEList[se].url}${encodeURIComponent(searchQuery.value.trim())}`;
        window.open(searchUrl, '_blank');
        searchQuery.value = '';
    }
}

// 导航菜单项
const navigationItems = ref([
    {
        value: 'settings',
        label: '设置',
        icon: 'i-tabler-settings',
    },
    {
        value: 'websites',
        label: '网站',
        icon: 'i-tabler-app-window',
    },
    {
        value: 'xgtools',
        label: 'XGTools',
        icon: 'i-tabler-tools',
    }
]);
</script>

<style scoped>
.Home {
    min-height: 100vh;
    overflow: hidden;
}

*::-webkit-scrollbar {
    display: none;
}

.main {
    max-width: 1200px;
    margin: 100px auto 40px;
    display: flex;
    justify-content: center;
}

.web-container,
.tools-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: flex-start;
    justify-content: center;
}

.foot_nav {
    position: fixed;
    bottom: 20px;
    right: 20px;
    user-select: none;
    z-index: 3;
}

.box {
    width: 100px;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    user-select: none;
    cursor: pointer;
    /* transition: transform 0.2s ease, background-color 0.2s ease; */
}

.box_ico {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    /* background-color: rgba(0, 0, 0, 0.3); */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.2s ease;
}

.box_ico:hover {
    /* transform: translateY(-5px); */
    opacity: 0.7;
}

.title {
    font-size: 14px;
    text-align: center;
}

.setting-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}


.DockAera {
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 2;
}

.Dock {
    background-color: rgba(242, 242, 242, 0.1);
    box-shadow: 4px 4px 18px -10px rgb(41, 41, 41);
    display: flex;
    flex-wrap: nowrap;
    border-radius: 16px;
    min-width: 0;
    margin: 0 auto;
    gap: 10px;
    padding: 8px 16px;
    max-width: 100%;
    overflow: auto;
}

.dark .Dock {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
}

.Dock_ico {
    min-width: 30px;
    height: 30px;
    margin: 10px;
}

.Dock_ico:hover {
    opacity: 0.6;
}

/*动画*/
.show-move {
    transition: all .5s;
}

.show-enter-active {
    transition: all .2s;
}

.show-leave-active {
    transition: all .3s;
}

.show-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.show-enter-to {
    opacity: 1;
    transform: scale(1);
}

.show-leave-from {
    opacity: 1;
    transform: scale(0.8);
}

.show-leave-to {
    opacity: 0;
    transform: scale(0.6);
}
</style>