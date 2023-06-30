import ItemBarret from "components/molecules/ItemBarret";
import Text from "components/atoms/Texts/Text";
import Button from "components/atoms/Buttons/Button";
import Counter from "components/molecules/Counter";

const CartDisplayer = ({
  order,
  cart,
  onItemValueChange,
  onCounterChange,
  onPay,
}) => {
  return (
    <>
      {order.itemsIds.map((elem, idx) => {
        const { item } = elem;

        return (
          <ItemBarret
            key={`itemBarret_${idx}`}
            picture={item.pictures[0]}
            name={item.name}
            quantity={elem.quantity}
            price={item.price}
            duration={order.duration}
            onValueChange={(val) => onItemValueChange(val, item, idx)}
            style={{
              marginBottom: idx < order.itemsIds.length - 1 ? 16 : 0,
            }}
          />
        );
      })}

      {cart.length > 0 && (
        <>
          <Text
            fontSize="font18"
            fontWeight={400}
            textAlign="center"
            style={{ marginTop: 32 }}
          >
            Durée de la location (en jour)
          </Text>
          <Counter
            value={order.duration}
            minValue={1}
            maxValue={7}
            onValueChange={onCounterChange}
            style={{ margin: "8px auto 48px" }}
          />

          <Button
            color="gradientPurpleGreen"
            width="500px"
            onClick={onPay}
            style={{ padding: 12, margin: "0 auto" }}
          >
            Payer -{" "}
            {cart.length > 1
              ? cart
                  .map((item) => ({
                    price: item.price,
                    quantity: item.quantity,
                  }))
                  .reduce((acc, obj) => {
                    return acc + obj.quantity * obj.price;
                  }, 0) * order.duration
              : cart[0].price * cart[0].quantity * order.duration}
            €
          </Button>
        </>
      )}
    </>
  );
};

export default CartDisplayer;
