// 角色数据模拟
export default{
	
	status : true,
	roles  : [
		{
			role_id: "100000",
			role_name: "超级管理员",
			role_order: "1"
		},
		{
			role_id: "100001",
			role_name: "文章管理员",
			role_order: "2"
		} 
	],
	detail : {
		role_id: "1005",
		role_name: "超级管理",
		role_order: "1",
		role_content : '{'+
			'"System":{"Index":1},'+
			'"Account":{"Index":1},'+
			'"Messages":{"Index":1},'+
			'"ManagerRoles":{"Index":1, "Add":1, "Delete":1, "Edit":1}'+
		"}"
	}
}