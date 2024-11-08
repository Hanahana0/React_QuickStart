import React, {useState, useEffect, useCallback} from 'react';
import CustomGrid from '../../../components/CustomGrid';
import {UserSelect, UserSave, UserUpdate, UserDelete} from './UserManagementService';
import './UserManagement.css';
import ContentSearchArea from "../../../layout/ContentSearchArea";

const UserManagement = ({tab}) => {

    const [rowData, setRowData] = useState([]);
    const [newRowId, setNewRowId] = useState(null); // 새로 추가된 행의 ID
    const [selectedUserIds, setSelectedUserIds] = useState(new Set()); // 삭제 체크박스 선택된 ID들

    // 검색 조건 필드 정의 (추후 DB에서 동적으로 가져올 수 있음)
    const searchFields = [
        {id: "1", label: "DATE", type: "date", name: "startDate"},
        {id: "2", label: "NAME", type: "text", name: "name"},
        {id: "3", label: "ROLE", type: "text", name: "role"},      // 역할 필드 추가
        {id: "4", label: "STATUS", type: "text", name: "status"}   // 상태 필드 추가
    ];

    // searchFields에 기반하여 searchConditions 초기화
    const [searchConditions, setSearchConditions] = useState(
        searchFields.reduce((acc, field) => {
            acc[field.name] = ''; // 기본값은 빈 문자열로 설정
            return acc;
        }, {})
    );

    // 칼럼 정의
    const columnDefs = [
        {field: 'id', headerName: 'ID'},
        {field: 'username', headerName: '아이디', editable: true},
        {field: 'email', headerName: '이메일', editable: true},
        {
            field: 'role',
            headerName: '역할',
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['user', 'admin'],
            },
        },
    ];
    // 데이터조회
    const handleSearch = async () => {
        const filteredConditions = Object.entries(searchConditions)
            .reduce((acc, [key, value]) => {
                if (value) acc[key] = value; // 빈 값이 아닌 조건만 필터링
                return acc;
            }, {});

        try {
            const response = await UserSelect(filteredConditions);
            const data = response.map(item => ({...item, status: 'loaded'}));
            setRowData(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    // 데이터 조회
    // const fetchData = useCallback(async () => {
    //     try {
    //         const response = await UserSelect();
    //         const fetchedData = response.data.map(item => ({...item, status: 'loaded'})); // 조회된 데이터는 'loaded' 상태
    //         setRowData(fetchedData);
    //     } catch (error) {
    //         console.error("Failed to fetch users:", error);
    //     }
    // }, [searchConditions]);
    //
    // // 초기 데이터 로드
    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    // 신규 행 추가
    const handleAdd = () => {
        const newId = Date.now(); // 임시 ID로 사용
        const newRow = {
            id: newId,
            username: '',
            email: '',
            role: 'user',
            status: 'new', // 신규 행 상태
        };
        setRowData(prevData => [...prevData, newRow]);
    };

    // 데이터 저장
    const handleSaveNewRow = async () => {
        const newUser = rowData.find(row => row.status === 'new');

        if (newUser && newUser.username && newUser.email && newUser.role) {
            try {
                await UserSave(newUser);
                setNewRowId(null); // 새 행 스타일 제거
                // fetchData(); // 데이터 갱신
            } catch (error) {
                console.error("Failed to save user:", error);
            }
        } else {
            alert('아이디, 이메일, 역할을 입력해주세요.');
        }
    };

    // 수정
    const handleEdit = (user) => {
        const updatedUser = {
            ...user,
            username: prompt('아이디를 입력하세요', user.username),
            email: prompt('이메일을 입력하세요', user.email),
            role: prompt('역할을 입력하세요', user.role),
            status: 'updated', // 수정 상태
        };

        UserUpdate(updatedUser)
            // .then(fetchData)
            .catch(error => console.error("Failed to update user:", error));
    };

    // 체크박스로 선택된 사용자 ID 업데이트
    const onSelectionChanged = (params) => {
        const selectedNodes = params.api.getSelectedNodes();
        const selectedIds = new Set(selectedNodes.map(node => node.data.id));
        setSelectedUserIds(selectedIds);
    };

    // 그리드 준비
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <div className="toolbar">
                <button onClick={handleSearch}>조회</button>
                <button onClick={handleAdd}>추가</button>
                <button onClick={handleSaveNewRow}>저장</button>
            </div>
            <ContentSearchArea
                tab={tab}
                searchFields={searchFields}
                searchConditions={searchConditions}
                setSearchConditions={setSearchConditions}
            />
            <CustomGrid
                columnDefs={columnDefs}
                rowData={rowData}
                // rowSelection="multiple"
                onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
                rowClassRules={true} // 색상 규칙 활성화 여부를 전달
            />
        </div>
    );
};

export default UserManagement;
