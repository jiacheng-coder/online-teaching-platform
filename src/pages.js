// 菜单
export default [
  {
    label: '系统信息',
    icon: 'ga-icon icon-system',
    pages: [
      {
        label: '系统首页',
        path: '/System/Index',
        component: () => import('./views/System/Index.vue'),
      },
      {
        label: '我的消息',
        path: '/Messages/Index',
        component: () => import('./views/Messages/Index.vue'),
      },
      {
        label: '账户信息',
        path: '/Account/Index',
        component: () => import('./views/Account/Index.vue'),
      },
    ],
  },
  {
    label: '用户会员',
    icon: 'ga-icon icon-members',
    // 系统用户
    pages: [
      {
        label: '角色管理',
        path: '/ManagerRoles/Index',
        component: () => import('./views/ManagerRoles/Index.vue'),
        addition: [
          { label: '添加角色', path: 'Add' },
          { label: '编辑角色', path: 'Edit' },
          { label: '删除角色', path: 'Delete' },
        ],
      },
      {
        label: '系统用户',
        path: '/Managers/Index',
        component: () => import('./views/Managers/Index.vue'),
        addition: [
          { label: '添加用户', path: 'Add' },
          { label: '编辑用户', path: 'Edit' },
          { label: '删除用户', path: 'Delete' },
        ],
      },
      {
        label: '会员管理',
        path: '/Members/Index',
        component: () => import('./views/Members/Index.vue'),
        addition: [
          {
            label: '查看详情',
            path: 'Detail',
            component: () => import('./views/Members/Detail.vue'),
          },
          { label: '编辑会员', path: 'Edit' },
        ],
      },
    ],
  },
  {
    label: '内容管理',
    icon: 'ga-icon icon-article',
    pages: [
      {
        label: '文章管理',
        path: '/Articles/Index',
        component: () => import('./views/Articles/Index.vue'),
        addition: [
          { label: '添加文章', path: 'Add', component: () => import('./views/Articles/Submit.vue') },
          { label: '编辑文章', path: 'Edit', component: () => import('./views/Articles/Submit.vue') },
          { label: '删除文章', path: 'Delete' },
        ],
      },
      {
        label: '评论管理',
        path: '/Comments/Index',
        component: () => import('./views/Comments/Index.vue'),
        addition: [{ label: '删除评论', path: 'Delete' }],
      },
    ],
  },
  // 配置菜单
  // {
  //   label: '测试菜单',
  //   // 此处请参考图标库扩展手册部分，此处为图标样式名称
  //   icon: 'ga-icon icon-article',
  //   pages: [
  //     // 菜单下功能页面配置
  //     {
  //       label: '测试功能',
  //       // 功能路径 对应于下面的视图路径，首字母大写
  //       path: '/Test/Index',
  //       // 注册真实页面组件
  //       component: () => import('./views/Test/Index.vue'),
  //       // 附加权限，如 增加、编辑、删除 数据等等，
  //       // 附加权限适用于进用于权限控制，不需要实际页面的场景
  //       addition: [
  //         // 需要注册页面组件演示
  //         // 如 添加数据页面
  //         {
  //           label: '添加数据',
  //           path: 'Add',
  //           component: () => import('./views/Test/Add.vue'),
  //         },
  //         // 不需要注册页面组件演示
  //         // 编辑数据功能，没有实际的路由页面，如使用弹窗形式打开编辑窗口
  //         { label: '编辑数据', path: 'Edit' },
  //         // 删除数据功能
  //         { label: '删除数据', path: 'Delete' },
  //       ],
  //     },
  //   ],
  // },
  {
    label: '课程班级',
    // 此处请参考图标库扩展手册部分，此处为图标样式名称
    icon: 'ga-icon icon-article',
    pages: [
      // 菜单下功能页面配置
      {
        label: '我教的课',
        // 功能路径 对应于下面的视图路径，首字母大写
        path: '/Course/Index',
        // 注册真实页面组件
        component: () => import('./views/Course/Index.vue'),
        // 附加权限，如 增加、编辑、删除 数据等等，
        // 附加权限适用于进用于权限控制，不需要实际页面的场景
      },
    ],
  },
  // 配置完成后会体现到角色选择
]
