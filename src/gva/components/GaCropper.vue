<template>
	<el-dialog 
	v-model="dialogShow"
	:width="dialogWidth"
	title="图片剪裁">
		<div 
		:style="{
			width:'100%',
			height:dialogHeight+'px'
		}">
			<vue-cropper 
			ref="cropper" 
			:img="img" 
			:output-size="option.size" 
			:output-type="option.outputType" 
			:info="true" 
			:full="option.full" 
			:fixed="true" 
			:fixed-number="[1,1]" 
			:can-move="option.canMove" 
			:can-move-box="option.canMoveBox" 
			:fixed-box="option.fixedBox" 
			:original="option.original" 
			:auto-crop="option.autoCrop" 
			:auto-crop-width="cropWidth" 
			:auto-crop-height="cropHeight" 
			:center-box="option.centerBox"
			:high="option.high" 
			:max-img-size="option.max"></vue-cropper>
		</div>
		<template #footer>
		    <div class="ga-submit-footer">
		        <el-button 
				type="primary" 
		        @click="saveImg" 
		        :loading="buttonLoading">保存</el-button>
		    </div>
		</template>
	</el-dialog>
</template>
<script>
import { VueCropper }  from "vue-cropper";
import 'vue-cropper/dist/index.css'
export default{
	components : { VueCropper },
	props      : {
		img : {
			type    : String,
			default : 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
		},
		cropWidth : {
			type    : Number,
			default : 200
		},
		cropHeight : {
			type    : Number,
			default : 200
		}
	},
	data() {
		return {
			dialogWidth   : '50%',
			// 高度
			dialogHeight  : 200,
			dialogShow    : false,
			buttonLoading : false,
			option        : {
				size        : 1,
				full        : false,
				outputType  : 'png',
				canMove     : true,
				fixedBox    : true,
				original    : false,
				canMoveBox  : true,
				autoCrop    : true,
				centerBox   : false,
				high        : false,
				max         : 99999,
			},
		}
	},
	emits:['onSave'],
	methods:{
		saveImg : function () {
			this.$refs.cropper.getCropData((data) => {
				this.$emit('onSave', data);
				this.close();
			});
		},
		open : function(){
			this.dialogShow = true;
			this.initSubmitBody();
		},
		close : function(){
			this.dialogShow = false;
		},
		// 初始化提交窗口
		initSubmitBody : function(){
		    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
		    var winWidth  = document.documentElement.clientWidth || document.body.clientWidth;
		    if(winWidth < 500){
		        this.dialogHeight = winHeight * 0.55;
		        this.dialogWidth  = winWidth * 0.95;
		    }else if(winWidth < 1000){
		        this.dialogHeight = winHeight * 0.6;
		        this.dialogWidth  = winWidth * 0.88;
		    }else if(winWidth < 1500){
		        this.dialogHeight = winHeight * 0.55;
		        this.dialogWidth  = winWidth * 0.65;
		    }else if(winWidth < 2000){
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.6;
		    }else if(winWidth < 3000){
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.5;
		    }else{
		        this.dialogHeight = winHeight * 0.5;
		        this.dialogWidth  = winWidth * 0.4;
		    }
		}
	},
	mounted : function(){
		this.initSubmitBody();
	}
}
</script>
<style>
</style>
