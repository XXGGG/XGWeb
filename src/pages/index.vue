<template>
    <div class="Home">
        <!-- 搜索框 -->
        <!-- <Transition name="show">
            <div v-if="setting.setting.SE != ''" class="search-container">
                <div class="form-control w-full max-w-md mx-auto">
                    <div class="input-group">
                        <span class="input-group-text bg-base-200 border-base-300">
                            <div :class="SEList[setting.setting.SE]?.icon" class="w-5 h-5 text-base-content/70"></div>
                        </span>
                        <input 
                            type="text" 
                            placeholder="搜索..." 
                            class="input input-bordered input-lg w-full bg-base-100 border-base-300 text-base-content placeholder-base-content/50 focus:border-base-content/30 focus:outline-none"
                            v-model="searchQuery"
                            @keyup.enter="performSearch"
                        />
                    </div>
                </div>
            </div>
        </Transition> -->

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
        <!-- <Transition name="show">
            <div class="DockAera" v-if="setting.setting.simplify">
                <div class="Dock">
                    <div class="Dock_ico" cursor-pointer :class="site.icon"
                        v-for="(site, index) in setting.websites.list" :key="index" @click="goToWebsite(site.url)"></div>
                    <USeparator orientation="vertical" p-2/>
                    <div class="Dock_ico" cursor-pointer :class="i.icon" v-for="i in filteredTools"
                        @click="go_router(i.url)"></div>
                </div>
            </div>
        </Transition> -->


        <!-- 底部设置 -->
        <!-- <div class="foot_nav">
            <UDrawer direction="right" inset :handle="false">
                <div cursor-pointer p-4 i-tabler-settings></div>

                <template #content>
                    <div class="modal-container">
                        <UTabs :items="navigationItems" v-model="activeSection"
                            style="position: sticky; top:0; z-index: 99;" />

                        <div class="content-area">
                            <div v-if="activeSection == 'settings'" class="setting-section">
                                <div class="setting-item">
                                    <span>搜索引擎</span>
                                    <USelect :icon="SEList[setting.setting.SE].icon" v-model="setting.setting.SE"
                                        :items="searchEngineOptions" class="w-48" />
                                </div>
                                <USeparator />
                                <div class="setting-item">
                                    <span>显示网站</span>
                                    <USwitch v-model="setting.setting.showwebsites" />
                                </div>
                                <div class="setting-item">
                                    <span>显示XGTools</span>
                                    <USwitch v-model="setting.setting.showxgtools" />
                                </div>
                                <div class="setting-item">
                                    <span>显示名称</span>
                                    <USwitch v-model="setting.setting.showname" />
                                </div>
                                <USeparator />
                                <div class="setting-item">
                                    <span>简化</span>
                                    <USwitch v-model="setting.setting.simplify" />
                                </div>
                            </div>

                            <div v-if="activeSection == 'websites'" class="setting-section">
                                <div class="add-website">
                                    <UModal>
                                        <UButton class="subsection-header">添加网站</UButton>
                                        <template #content>
                                            <div class="web-form">
                                                <UInput v-model="newWebsite.name" placeholder="网站名称" class="w-full" />
                                                <UInput v-model="newWebsite.url" placeholder="网站地址 (https://...)"
                                                    class="w-full" />
                                                <IconSelector @select="(icon) => newWebsite.icon = icon" />

                                                <UButton @click="addWebsite" label="添加" color="primary" class="ma" />
                                            </div>
                                        </template>
                                    </UModal>
                                </div>

                                <h4 class="subsection-header mt-4">已添加网站</h4>
                                <div class="websites-list">
                                    <div v-for="(site, index) in setting.websites.list" :key="index"
                                        class="website-item">
                                        <div class="site-info">
                                            <div :class="site.icon" class="site-icon"></div>
                                            <div class="site-name">{{ site.name }}</div>
                                        </div>
                                        <div class="site-actions">
                                            <UModal v-model:open="showEditModal">
                                                <UButton icon="i-tabler-pencil" text-blue variant="ghost" size="xl"
                                                    @click="editWebsite(index)" />
                                                <template #content>
                                                    <div class="web-form">
                                                        <h3 class="text-lg font-semibold mb-4">编辑网站</h3>
                                                        <div :class="editingWebsite.icon" class="ma size-10 border-2"></div>
                                                        <UInput v-model="editingWebsite.name" placeholder="网站名称"
                                                            class="w-full" />
                                                        <UInput v-model="editingWebsite.url"
                                                            placeholder="网站地址 (https://...)" class="w-full" />
                                                        <IconSelector @select="(icon) => editingWebsite.icon = icon" />

                                                        <div class="flex justify-end gap-2 mt-4">
                                                            <UButton @click="showEditModal = false" variant="ghost">
                                                                取消
                                                            </UButton>
                                                            <UButton @click="saveEditedWebsite" color="primary">保存
                                                            </UButton>
                                                        </div>
                                                    </div>
                                                </template>
                                            </UModal>
                                            <UButton icon="i-tabler-trash" text-red variant="ghost" size="xl"
                                                @click="removeWebsite(index)" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="activeSection == 'xgtools'" class="setting-section">
                                <div class="tools-list">
                                    <div v-for="(tool, index) in setting.xgtools.list" :key="index" class="tool-item">
                                        <div class="tool-info">
                                            <div :class="tool.icon" class="tool-icon"></div>
                                            <div class="tool-name">{{ tool.name }}</div>
                                        </div>
                                        <USwitch v-model="tool.enabled" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </UDrawer>
        </div> -->
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
// const go_router = (url: string) => {
//     window.location.href = url
// }

//网站
const goToWebsite = (url: string) => {
    window.open(url, '_blank');
}

// 筛选显示启用的工具
// const filteredTools = computed(() => {
//     return setting.value.xgtools.list.filter(tool => tool.enabled);
// });

// 搜索相关
// const searchQuery = ref('');

// const SEList: any = {
//     "Google": {
//         "name": "Google",
//         "url": "https://www.google.com/search?q=",
//         "icon": "i-pajamas-google"
//     },
//     "Bing": {
//         "name": "Bing",
//         "url": "https://cn.bing.com/search?q=",
//         "icon": "i-simple-icons-microsoftbing"
//     },
//     "Baidu": {
//         "name": "百度",
//         "url": "https://www.baidu.com/s?wd=",
//         "icon": "i-ri-baidu-line"
//     },
//     "Sogou": {
//         "name": "搜狗",
//         "url": "https://www.sogou.com/web?query=",
//         "icon": "i-cib-sogou"
//     },
//     "Yandex": {
//         "name": "Yandex",
//         "url": "https://www.yandex.com/search/?text=",
//         "icon": "i-vscode-icons-file-type-yandex"
//     }
// };


// 将 SE 对象的键转换为选项数组
// const searchEngineOptions = computed(() => {
//     return Object.keys(SEList).map(key => ({
//         label: SEList[key].name,
//         value: key,
//         icon: SEList[key].icon
//     }));
// });


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
            // {
            //     'icon': 'i-solar-posts-carousel-vertical-bold-duotone',
            //     'title': 'Test-页面滚动',
            //     'url': '/test-scroll',
            //     'enabled': false,
            // },
            // {
            //     'icon': 'i-solar-mouse-circle-line-duotone',
            //     'title': 'Test-鼠标',
            //     'url': '/test-mouse',
            //     'enabled': false,
            // },
        ]
    }
})

// 执行搜索
// const performSearch = () => {
//     let se = setting.value.setting.SE
//     if (searchQuery.value.trim()) {
//         const searchUrl = `${SEList[se].url}${encodeURIComponent(searchQuery.value.trim())}`;
//         window.open(searchUrl, '_blank');
//         searchQuery.value = '';
//     }
// }

// 导航菜单项
// const navigationItems = ref([
//     {
//         value: 'settings',
//         label: '设置',
//         icon: 'i-tabler-settings',
//     },
//     {
//         value: 'websites',
//         label: '网站',
//         icon: 'i-tabler-app-window',
//     },
//     {
//         value: 'xgtools',
//         label: 'XGTools',
//         icon: 'i-tabler-tools',
//     }
// ]);

// 当前激活的设置部分
// const activeSection = ref('settings');

// 新网站表单
// const newWebsite = reactive({
//     name: '',
//     url: '',
//     icon: ''
// });

// 添加网站
// const addWebsite = () => {
//     if (newWebsite.name && newWebsite.url) {
//         // 检查 URL 格式
//         if (!newWebsite.url.startsWith('http')) {
//             newWebsite.url = 'https://' + newWebsite.url;
//         }

//         // 添加到网站列表
//         setting.value.websites.list.push({
//             name: newWebsite.name,
//             url: newWebsite.url,
//             icon: newWebsite.icon || 'i-tabler-world-www' // 默认图标
//         });

//         // 重置表单
//         newWebsite.name = '';
//         newWebsite.url = '';
//         newWebsite.icon = '';
//     }
// };

// 编辑网站相关
// const showEditModal = ref(false);
// const editingIndex = ref(-1);
// const editingWebsite = reactive({
//     name: '',
//     url: '',
//     icon: ''
// });

// // 编辑网站
// const editWebsite = (index: number) => {
//     editingIndex.value = index;
//     const site = setting.value.websites.list[index];
//     editingWebsite.name = site.name;
//     editingWebsite.url = site.url;
//     editingWebsite.icon = site.icon;
//     showEditModal.value = true;
// };

// // 保存编辑的网站
// const saveEditedWebsite = () => {
//     if (editingIndex.value >= 0 && editingWebsite.name && editingWebsite.url) {
//         // 检查 URL 格式
//         if (!editingWebsite.url.startsWith('http')) {
//             editingWebsite.url = 'https://' + editingWebsite.url;
//         }

//         // 更新网站信息
//         setting.value.websites.list[editingIndex.value] = {
//             name: editingWebsite.name,
//             url: editingWebsite.url,
//             icon: editingWebsite.icon || 'i-tabler-world-www'
//         };

//         showEditModal.value = false;
//         editingIndex.value = -1;
//         editingWebsite.name = '';
//         editingWebsite.url = '';
//         editingWebsite.icon = '';
//     }
// };

// // 删除网站
// const removeWebsite = (index: number) => {
//     setting.value.websites.list.splice(index, 1);
// };

</script>

<style scoped>
.Home {
    padding-top: 80px;
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
    z-index: 999;
    user-select: none;
}

.modal-container {
    /* width: 100vh; */
    width: 400px;
    padding: 8px;
}

.search-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: center;
}

.search-container .input-group {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.search-container .input-group:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.search-container .input-group:focus-within {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
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

.content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.setting-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
}


.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0;
}

.web-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
}

.websites-list,
.tools-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
}

.website-item,
.tool-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.05);
}

.site-info,
.tool-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.site-icon,
.tool-icon {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.site-name,
.tool-name {
    font-size: 14px;
}

.site-actions {
    display: flex;
    gap: 8px;
}

.DockAera {
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 100;
}

.Dock {
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: nowrap;
    border-radius: 26px;
    min-width: 0;
    margin: 0 auto;
    gap: 10px;
    padding:8px 16px;
    max-width: 100%;
    overflow: auto;
}

.Dock_ico {
    min-width:30px;
    height: 30px;
    margin: 10px;
}
.Dock_ico:hover {
    opacity: 0.5;
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