const bcrypt = require('bcrypt');
const database = require('../models');
const { generateToken } = require('../utils/jwtUtil');

const User = database.User;
const Customer = database.Customer;

// Register a new user
const register = async (req, res) => {
  const { username, email, password, role="User", address, city, country } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const customer = await Customer.create({name: username, address, city, country});
    console.log('newUser==>', newUser , '\n', customer)
    // Generate JWT token
    const token = generateToken({ userId: newUser.user_id, role: role });

    return res.send({
        message: "Register successful",
        token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password, role="User" } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ userId: user.user_id, role: role });

    return res.send({
        message: "Login successful",
        token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getUsersByPagination = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      include: [Customer],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    const totalPage = Math.ceil(count / limit);

    res.json({
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPage: totalPage,
        hasNext: page < totalPage,
      },
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update customer
const updateUser = async (req, res) => {
  const transaction = await User.sequelize.transaction();

  try {
    const { username, email, password, address, city, country } = req.body;
    const user = await User.findOne({
      where: { user_id: req.params.id },
      include: [Customer]
    });

    if(user){
      //  await user.update(req?.body, transaction);
      const updatedUser = await User.update({ username, email, password }, {
        where: { user_id: user?.user_id },
        transaction,
      });

      if (updatedUser[0] === 0) {
        throw new Error('User not found');
      }

      // Update Customer
      const updatedCustomer = await Customer.update({username, address, city, country}, {
        where: { customer_id: user?.Customer?.customer_id },
        transaction,
      });

      if (updatedCustomer[0] === 0) {
        throw new Error('Customer not found');
      }   
    }

    // Commit the transaction
    await transaction.commit();

    return { message: 'User and Customer updated successfully' };
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req?.params?.id);
    if (user) {
      await user.destroy();
      new Response(res).setMessage(`Successfully deleted customer id=${req?.params?.id}.`).setResponse(user).send();
    } else {
      new Response(res)
        .setStatusCode(404)
        .setMessage("Customer not found...!")
        .send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};


module.exports = {
  register,
  login,
  getUsersByPagination,
  deleteUser,
  updateUser,
};