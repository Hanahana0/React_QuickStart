import React from 'react';

const ComponentMap = {
    '/adm/menuManagement': React.lazy(() => import('../pages/adm/menuManagement/MenuManagement')),
    '/adm/codeManagement': React.lazy(() => import('../pages/adm/codeManagement/CodeManagement')),
    '/adm/userManagement': React.lazy(() => import('../pages/adm/userManagement/UserManagement')),
    // 다른 컴포넌트들도 추가 가능
};

export default ComponentMap;


// import React from 'react';
//
// const modules = require.context('../pages', true, /\.js$/);
// const ComponentMap = {};
//
// modules.keys().forEach(filePath => {
//     console.log("filePath >>> ", filePath);
//     // './pages/adm/menuManagement/MenuManagement.js' 형식으로 변환
//     const path = `../pages${filePath.slice(1).replace('.js', '')}`;
//     console.log("path >>> ", path);
//     // ComponentMap 경로와 컴포넌트를 매핑
//     ComponentMap[path] = React.lazy(() => modules(filePath));
// });
//
// export default ComponentMap;
