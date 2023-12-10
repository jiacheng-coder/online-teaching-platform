<template>
    <div style="border: 1px solid #ccc; width:100%;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y:hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import config  from "~/config";
export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
	const valueHtml = ref("");
	let HeaderData = {};
	if (config.request.tokenName[1]){
		HeaderData[config.request.tokenName[1]] = config.request.initUserToken("/Upload/Image");
	}
    const toolbarConfig = {
		toolbarKeys: [
			'clearStyle',
			'|',
			'headerSelect',
			'|',
			'blockquote',
			'|',
			// 菜单组，包含多个菜单
			{
				key: 'group-more-style', // 必填，要以 group 开头
				title: '图片', // 必填
				menuKeys: ["insertImage", "uploadImage"] 
			},
			'|',
			'codeBlock',
			'|',
			'insertLink',
			'|',
			'numberedList',
			'|',
			'bulletedList',
			'|',
			'insertTable',
			'|',
			'insertVideo',
			'|',
			'divider',
			'|',
			'fullScreen',
		]
	}
    const editorConfig = {
		MENU_CONF : {
			uploadImage : {
				server        : config.request.imageUploadApiUrl,
				headers       : HeaderData,
				fieldName     : 'file',
				onError       : (file, err, res)=>{
					ElMessage({
						offset  : 38,
						message : '文件上传失败', 
						type: 'error'
					});
				}
			}
		},
		placeholder :  ''
	}
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
	
	const setHtml = (html) => {
		const editor = editorRef.value;
		if (editor == null) return;
		editor.setHtml(html);
	}
	
	const getContent = () => {
		const editor = editorRef.value;
		if (editor == null) return;
		return editor.getHtml();
	}

    return {
      editorRef,
	  valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated, 
	  setHtml,
	  getContent
    };
  }
}
</script>