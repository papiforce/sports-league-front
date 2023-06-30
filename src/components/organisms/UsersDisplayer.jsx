import AdminUserBarret from "components/molecules/AdminUserBarret";

const UsersDisplayer = ({ users, onSelect, onUpdate, onDelete }) => {
  return users.map((user, idx) => (
    <AdminUserBarret
      key={idx}
      {...user}
      onSelect={() => onSelect(user._id)}
      onUpdate={(data) => onUpdate(user._id, data)}
      onDelete={() => onDelete(user._id)}
      style={{ marginBottom: idx < users.length - 1 ? 16 : 0 }}
    />
  ));
};

export default UsersDisplayer;
