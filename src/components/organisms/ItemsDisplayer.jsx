import AdminItemBarret from "components/molecules/AdminItemBarret";

const ItemsDisplayer = ({ items, onUpdate, onDelete }) => {
  return items.map((item, idx) => (
    <AdminItemBarret
      key={idx}
      name={item.name}
      pictures={item.pictures}
      quantity={item.quantity}
      price={item.price}
      description={item.description}
      category={item.category}
      sex={item.sex}
      onUpdate={(data) => onUpdate(item._id, data)}
      onDelete={() => onDelete(item._id)}
      style={{
        marginBottom: idx < items.length - 1 ? 16 : 0,
      }}
    />
  ));
};

export default ItemsDisplayer;
