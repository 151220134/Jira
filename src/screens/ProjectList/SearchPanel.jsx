export const SearchPanel = ({param, setParam, users}) => {
    return (
        <div id="SearchPanel">
            <input type="text" value={param.name} onChange={e => {
                // setParam(Object.assign({}, param, { name: e.target.value }))
                setParam({...param, name: e.target.value})
            }} />
            <select value={param.personId} onChange={e => {
                setParam({...param, personId: e.target.value})
            }}>
                <option value={''}>负责人</option>
                {users.map(user => (<option key={user.id} value={user.id}>{user.name}</option>))}
            </select>
        </div>
    )
}