// 权限管理
const Permission = () => import('@/pages/permission')
const UserManage = () => import('@/pages/permission/user-manage')
const RoleManage = () => import('@/pages/permission/role-manage')

// 员工绩效管理
const Staff = () => import('@/pages/staff')
const PlanManage = () => import('@/pages/staff/plan-manage')
const PlanDetailsManage = () => import('@/pages/staff/plan-manage/plan-details')
const AssessManage = () => import('@/pages/staff/assess-manage')
const AssessDetailsManage = () => import('@/pages/staff/assess-manage/assess-details')

// 组织绩效管理
const Org = () => import('@/pages/org')
const OrgPlanManage = () => import('@/pages/org/org-plan-manage')
const OrgPlanDetailsManage = () => import('@/pages/org/org-plan-manage/org-plan-details')
const OrgAssessManage = () => import('@/pages/org/org-assess-manage')
const OrgAssessDetailsManage = () => import('@/pages/org/org-assess-manage/org-assess-details-manage')

// 系统管理
const Sys = () => import('@/pages/sys')
const SchemeManage = () => import('@/pages/sys/scheme-manage')
const SchemeDetailsManage = () => import('@/pages/sys/scheme-manage/scheme-details')

/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/staff',
        component: Staff,
        name: 'staff',
        meta: {
            name: '员工绩效管理',
            icon: 'table'
        },
        children: [
            {
                path: 'plan',
                name: 'plan-manage',
                component: PlanManage,
                meta: {
                    name: '员工计划',
                    icon: 'table'
                }
            },
            {
                path: 'planDetails',
                name: 'plan-details-manage',
                component: PlanDetailsManage,
                meta: {
                    name: '员工计划详情',
                    icon: 'table'
                },
                children: [],
                hidden: true
            },
            {
                path: 'assess',
                name: 'assess-manage',
                component: AssessManage,
                meta: {
                    name: '员工考核',
                    icon: 'table'
                }
            },
            {
                path: 'assessDetails',
                name: 'assess-details-manage',
                component: AssessDetailsManage,
                meta: {
                    name: '员工考核详情',
                    icon: 'table'
                },
                children: [],
                hidden: true
            }
        ]
    },
    {
        path: '/org',
        component: Org,
        name: 'org',
        meta: {
            name: '组织绩效管理',
            icon: 'table'
        },
        children: [
            {
                path: 'orgPlan',
                name: 'org-plan-manage',
                component: OrgPlanManage,
                meta: {
                    name: '组织计划',
                    icon: 'table'
                }
            },
            {
                path: 'orgPlanDetails',
                name: 'org-plan-details-manage',
                component: OrgPlanDetailsManage,
                meta: {
                    name: '组织计划详情',
                    icon: 'table'
                },
                children: [],
                hidden: true
            },
            {
                path: 'orgAssess',
                name: 'org-assess-manage',
                component: OrgAssessManage,
                meta: {
                    name: '组织考核',
                    icon: 'table'
                }
            },
            {
                path: 'orgAssessDetails',
                name: 'org-assess-details-manage',
                component: OrgAssessDetailsManage,
                meta: {
                    name: '组织考核详情',
                    icon: 'table'
                },
                children: [],
                hidden: true
            }
        ]
    },
    {
        path: '/sys',
        component: Sys,
        name: 'sys',
        meta: {
            name: '系统管理',
            icon: 'table'
        },
        children: [
            {
                path: 'scheme',
                name: 'scheme-manage',
                component: SchemeManage,
                meta: {
                    name: '方案管理',
                    icon: 'table'
                },
                children: []
            },
            {
                path: 'schemeDetails',
                name: 'scheme-details-manage',
                component: SchemeDetailsManage,
                meta: {
                    name: '方案详情',
                    icon: 'table'
                },
                children: [],
                hidden: true
            }
        ]
    },
    {
        path: '/permission',
        component: Permission,
        name: 'permission',
        meta: {
            name: '权限管理',
            icon: 'table'
        },
        children: [
            {
                path: 'user',
                name: 'user-manage',
                component: UserManage,
                meta: {
                    name: '用户管理',
                    icon: 'table'
                }
            },
            {
                path: 'role',
                name: 'role-manage',
                component: RoleManage,
                meta: {
                    name: '角色管理',
                    icon: 'eye'
                }
            }
        ]
    }
]

export default dynamicRoutes
