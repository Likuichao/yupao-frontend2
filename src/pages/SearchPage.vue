<template>
    <!--搜索框-->
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>
    <!--分割线-->
    <van-divider content-position="left">已选标签</van-divider>
    <!--展示标签-->
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="10">
        <van-col v-for="tag in activeIds">
            <!--展示选中标签-->
            <van-tag :show="show" closeable size="medium" type="primary" @close="doClose(tag)">
                {{tag}}
            </van-tag>
        </van-col>
    </van-row>
    <!--分割线-->
    <van-divider content-position="left">选择标签</van-divider>
    <!--分类选择-->
    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
    />
    <!--搜索按钮-->
    <div style="padding: 20px">
        <van-button type="primary" @click="doSearchResult" block>搜索</van-button>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import {useRouter} from "vue-router";
    //搜索栏内容
    const searchText = ref('');
    //已选中的标签id
    const activeIds = ref([]);
    const activeIndex = ref(0);
    //声明路由 全局
    const router = useRouter();
    //定义标签
    const originTagList = [
        {
            text: '性别',
            children: [
                {text: '男', id: '男'},
                {text: '女', id: '女'},
            ],
        },
        {
            text: '年级',
            children: [
                {text: '大一', id: '大一'},
                {text: '大二', id: '大二'},
                {text: '大三', id: '大三'},
            ],
        },
    ];
    //响应式定义 ref 标签列表
    let tagList = ref(originTagList);
    //搜索框过滤标签,根据输入的内容展示tagList
    const onSearch = () => {
        tagList.value = originTagList.map(parentTag => {
            const tempChildren = [...parentTag.children];//取出parentTag.children所有元素放到tempChildren中
            // console.log(tempChildren);
            const tempParentTag = {...parentTag};
            tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
            return tempParentTag;
        });
    };
    //点击取消
    const onCancel = () => {
        searchText.value = "";//搜索框为空
        tagList.value = originTagList;//分类标签(tagList)展示还原(originTagList)
    };
    const show = ref(true);
    //关闭标签（过滤掉tag标签）
    const doClose = (tag) => {
        activeIds.value = activeIds.value.filter(item => {
            return item !== tag;
        })
    };
    //带参数跳转到搜索结果页 -> SearchResultPage.vue
    const doSearchResult = () => {
        router.push({
            path: '/user/list',
            query: {
                tags: activeIds.value
            }
        })
    }
</script>

<style scoped>

</style>