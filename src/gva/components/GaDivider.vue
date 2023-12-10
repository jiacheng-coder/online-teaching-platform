<template>
	<div 
	:style="{
		width:width,
		height:height,
		borderBottom:border,
		background:background
	}"></div>
</template>
<script>
export default{
	props:{
		width :{type:String, default:'100%'},
		height:{type:String, default:'20px'},
		border:{type:String, default:'1px solid #E6E8F0'}, 
		background:{type:String, default:'none'}
	}
}
</script>
<style>
</style>
