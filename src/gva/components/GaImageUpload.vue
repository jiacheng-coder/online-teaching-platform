<template>
    <el-upload 
    ref="upload" 
    class="upload-demo" 
    :limit="limit" 
    :action="action" 
    :headers="headers" 
    :file-list="fileList" 
    list-type="picture" 
	accept="image/*" 
    :before-upload="beforeUpload" 
    :on-success="uploadSuccess" 
    :on-error="errorEvent" 
    :on-remove="remove">
        <template #trigger>
            <el-button 
            size="small" 
            :loading="buttonLoading" 
            :disabled="buttonLoading" 
            type="primary">选择图片</el-button>
        </template>
        <div></div>
    </el-upload>
</template>
<script>
import config  from '~/config';
import request from '@gvaJS/request';
export default{
    props : {
        limit : {type:Number, default:1}
    },
	emits:['uploadSuccess'],
    data(){
        return {
            action        : config.request.imageUploadApiUrl,
			headers       : request.__initHeaders(false, '/upload/index'),
            fileList      : [],
            buttonLoading : false,
            uploadedFile  : ''
        }
    },
    methods : {
        uploadSuccess : function(response, file, fileList){
            if(response.status){
                this.$emit('uploadSuccess', response.data);
                this.uploadedFile = response.data;
            }
            this.buttonLoading = false;
        },
        errorEvent : function(error, file, fileList){
			ElMessage({
				offset  : 128,
				message : '文件上传失败', 
				type: 'error'
			});
            this.buttonLoading = false;
        },
        beforeUpload : function(){
            this.buttonLoading = true;
        },
        remove : function(){
            if(this.uploadedFile == ''){return true;}
            request.post(
                'uploadFiles/remove',
                {fileName : this.uploadedFile},
                (res)=>{}
            );
			this.$emit('uploadSuccess', '');
        }
    }
}
</script>
<style>
</style>