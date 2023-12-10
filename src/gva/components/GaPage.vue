<template>
    <div class="ga-page-in">
		<el-row 
		justify="space-between" 
		align="middle" 
		:class="['ga-page-title', size == 'fullpage' ? '' : 'ga-detail-body']">
			<el-col 
			:span="headerSizes[0]">
				<slot name="headerLeft"></slot>
			</el-col>
			<el-col 
			:span="headerSizes[1]">
				<el-row justify="end">
					<slot name="headerRight"></slot>
				</el-row>
			</el-col>
		</el-row>
        <div 
		class="ga-page-body" 
		:class="size == 'fullpage' ? '' : 'ga-detail-body'">
			<slot name="body"></slot>
        </div>        
        <div class="ga-page-footer">
			<div 
			:class="size == 'fullpage' ? '' : 'ga-detail-body'">
				<slot name="footer"></slot>
			</div>
        </div>
    </div>
</template>
<script>
export default{
	props : {
		size         : {type:String, default:'fullpage'},
		headerSizes  : {type:Array, default:[12, 12]}
	},
    data() {
        return {
        }
    },
	emits:['pageInit'],
    methods: {},
    mounted() {
        this.$emit('pageInit', document.documentElement.clientHeight - 330);
    },
}
</script>
<style scoped>
</style>