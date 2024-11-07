const { prisma } = require("../../config/database");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the user has a cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true, // include items in the cart
      },
    });

    if (!cart) {
      // Create a new cart if the user doesn't have one
      await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [
              {
                productId,
                quantity,
              },
            ],
          },
        },
      });
      return res.status(200).json({ message: 'cart added to the user' });
    }

    // Check if the product is already in the cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingCartItem) {
      // If the product already exists, update the quantity
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
      return res.status(200).json({ message: 'Product quantity updated', cartItem: updatedCartItem });
    }

    // If the product doesn't exist in the cart, add it
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
    // console.log("adding element in cart");
    
    return res.status(200).json({ message: 'Product added to cart', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    // console.log("cant add element in cart");
    return res.status(500).json({ error: 'An error occurred while adding product to cart' });
  }
};



exports.removeFromCart = async (req, res) => {
  const { cartId, productId } = req.body;

  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: parseInt(cartId),
        productId: parseInt(productId),
      },
    });
    
    if (!cartItem) {
      console.log("not found")
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
        // cartId: parseInt(cartId),
        // productId: parseInt(productId),
      },
    });
    
    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }

};

exports.Increment=async (req,res)=>{
  const { productId, cartId } = req.body;
  
  try{
    const cartD = await prisma.cartItem.findFirst({
      where:{
        productId:parseInt(productId),
        cartId: parseInt(cartId),
      }
    })

    console.log("this is cartd -> ",cartD);
    const newQuantity=cartD.quantity+1;
    console.log("this is newQ ",newQuantity);
  
    await prisma.cartItem.update({
      where:{
        id:cartD.id
      },
      data:{
        quantity: newQuantity
      }
    })
    // console.log("updated Success");
    
    return res.status(200).send("updated")
  }catch(error){
    return res.status(500).send("Internal server error");
  }
}

exports.Decrement=async (req,res)=>{
  const { productId, cartId } = req.body;

  try{
    const cartD = await prisma.cartItem.findFirst({
      where:{
        productId:parseInt(productId),
        cartId: parseInt(cartId),
      }
    })

    console.log("this is cartd -> ",cartD);
    const newQuantity=cartD.quantity-1;
    console.log("this is newQ ",newQuantity);
  
    await prisma.cartItem.update({
      where:{
        id:cartD.id
      },
      data:{
        quantity: newQuantity
      }
    })
    console.log("updated Success");
    return res.status(200).send("updated")
  }catch(error){
    return res.status(500).send("Internal server error");
  }
}

exports.getCart = async (req, res) => {
  const { userId } = req.session;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch cart items" });
  }
};
