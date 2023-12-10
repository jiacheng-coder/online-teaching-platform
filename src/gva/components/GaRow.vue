<template>
	<view 
	:class="classesRuntime" 
	:style="styleRuntime">
		<slot></slot>
	</view>
</template>
<script>
export default{
	name  : "ga-row",
	props:{
		wrap               : {type:Boolean, default:false},
		mainAxisAlignment  : {type:String, default:'flex-start'},
		crossAxisAlignment : {type:String, default:'flex-start'},
		customStyle        : {type:String, default:''},
		customClasses      : {type:Array,  default:function(){return [];}}
	},
	data() {
		return {
			styleRuntime : '',
			classesRuntime : []
		}
	},
	methods:{
		makeStyle : function(){
			var styleRuntime = 'justify-content:'+this.mainAxisAlignment+'; ';
			styleRuntime += 'align-items:'+this.crossAxisAlignment+'; ';
			styleRuntime += this.customStyle;
			this.styleRuntime = styleRuntime;
		},
		makeClasses : function(){
			var classes = ['ga-flex', 'ga-row'];
			if(this.wrap){
				classes.push('ga-wrap');
			}else{
				classes.push('ga-nowrap');
			}
			classes = classes.concat(this.customClasses);
			this.classesRuntime = classes;
		}
	},
	mounted:function(){
		this.makeStyle();
		this.makeClasses();
	},
	watch:{
		mainAxisAlignment  : function(){this.makeStyle();},
		crossAxisAlignment : function(){this.makeStyle();},
		customStyle        : function(){this.makeStyle();},
		customClasses        : function(){this.makeClasses();},
		wrap               : function(){this.makeClasses();}
	}
}
</script>
<style scoped>
</style>