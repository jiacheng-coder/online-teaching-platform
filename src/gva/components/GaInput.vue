<template>
	<div style="width:100%; height:auto;">
		<div class="ga-input">
			<label 
			v-if="focusStatus != 1" 
			:style="{
				color:labelColor, 
			}" 
			class="ga-input-label">{{label}}</label>
			<div 
			v-if="focusStatus != 1" 
			style="height:13px; width:100%;"></div>
			<div 
			class="ga-input-body" 
			:class="[borderClass]">
				<input 
				:type="type" 
				@input="input" 
				:placeholder="focusStatus == 1 ? placeholder : ''" 
				@focusin="focusin" 
				@focusout="focusout" 
				:value="modelValue" 
				@change="change" 
				@keyup.enter="keyupEnter" 
				@mouseover="mouseover" 
				@mouseout="mouseout" 
				:autocomplete="autocomplete" 
				class="ga-input-text" />
			</div>
		</div>
		<div 
		v-if="typeof(error) == 'string'" 
		class="ga-input-error">{{error}}</div>
	</div>
</template>
<script>
export default{
	data() {
		return {
			focusStatus     : 1,
			borderClass     : 'ga-input-border-default',
			labelShow       : false,
			labelColor      : 'var(--el-text-color-placeholder)',
		}
	},
	props:{
		label        : { type:String, default:'' },
		modelValue   : { type:String, default:'' },
		type         : { type:String, default:'text' },
		placeholder  : { type:String, default:'' },
		error        : { type:[String,Boolean], default:false},
		autocomplete : { type:String, default:'off'},
	},
	mounted:function(){
		if(this.modelValue.length > 0){
			this.focusStatus = 5;
		}
		this.initLP();
	},
	emits:['change', 'keyupEnter', "update:modelValue"],
	methods:{
		focusin     : function(){
			this.focusStatus = 2;
			this.initLP();
		},
		focusout    : function(){
			if(this.modelValue.length > 0){
				this.focusStatus = 5;
			}else{
				this.focusStatus = 1;
			}
			this.initLP();
		},
		input : function(e){
			this.$emit("update:modelValue", e.target.value);
			if(this.focusStatus == 3){
				this.focusStatus = 2;
				this.initLP();
			}
		},
		initLP : function(){
			switch(this.focusStatus){
				case 1:
				this.borderClass = 'ga-input-border-default';
				this.labelColor  = 'var(--el-text-color-placeholder)';
				break;
				case 2:
				this.borderClass = 'ga-input-border-focus';
				this.labelColor  = 'var(--el-color-primary)';
				break;
				case 3:
				this.borderClass = 'ga-input-border-error';
				this.labelColor  = '#FF0036'; 
				break;
				case 5:
				this.borderClass = 'ga-input-border-default';
				this.labelColor  = 'var(--el-text-color-placeholder)'; 
				break;
				default :
				this.borderClass = 'ga-input-border-default';
				this.labelColor  = 'var(--el-text-color-placeholder)';
			}
		},
		change : function(e){
			this.$emit('change', e.target.value);
		},
		keyupEnter : function(e){
			this.$emit('keyupEnter', e.target.value);
		},
		mouseover : function(){
			if(this.focusStatus == 1){
				this.borderClass = 'ga-input-border-hover';
				this.labelColor  = 'var(--el-text-color-secondary)';
			}
		},
		mouseout : function(){
			if(this.focusStatus == 1){
				this.borderClass = 'ga-input-border-default';
				this.labelColor  = 'var(--el-text-color-placeholder)';
			}
		}
	},
	watch:{
		error       : function(val){
			if(val){
				this.focusStatus = 3;
				this.initLP();
			}
		}
	}
}
</script>
<style scoped="scoped">
.ga-input{
    position:relative; 
    width:100%;
	box-sizing:border-box;
	height:auto;
}
.ga-input-label {
    font-size:16px;
    line-height:26px;
    padding:0px 8px;
    display:block;
    position: absolute;
    left: 0px;
    top: 0px;
    transform:scale(0.8);
    z-index: 90;
    user-select: none;
	background-color:var(--el-color-white);
}
.ga-input-border-default{
	border:1px solid var(--el-border-color-light);
}
.ga-input-border-hover{
	border:1px solid var(--el-text-color-placeholder);
}
.ga-input-border-focus{
	border:2px solid var(--el-color-primary);
}
.ga-input-border-error{
	border:1px solid #FF0036;
}
.ga-input-body {
    width: 100%;
	border-radius:5px;
	box-sizing:border-box;
}
.ga-input-text{
    border:none !important;
    background: none;
	font-size:15px;
    line-height:30px;
	height:50px;
    margin: 0px;
    display: block;
    width:100%;
    padding:10px 15px;
    font-weight:500;
	box-sizing:border-box;
	outline:none;
	color:var(--el-text-color-primary);
}
.ga-input-text::placeholder {
	font-size:15px;
	color:var(--el-text-color-placeholder);
}
.ga-input-error{font-size:13px; color:#FF0036; line-height:20px; margin-top:6px; padding:0 5px;}
</style>
