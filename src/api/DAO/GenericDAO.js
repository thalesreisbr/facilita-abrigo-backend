const path = require('path');

exports.create = async (model, object) => {
  try {
    return await model.create(object);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.update = async (model, object, id) => {
  try {
    test =  await model.update(object, {
      where: {id:id},
    });

    return test
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.delete = async (model, id) => {
  try {
    return await model.destroy({
      where: {id:id},
      force: true
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.findByPk = async (model, id) => {
  try {

    return await model.findByPk(id);

  } catch (e) {
      console.log(e);
      throw e;
  }
  
};
exports.findAll = async (model, id) => {
    
    
  try {
    return await model.findAll();

  } catch (e) {
    console.log(e);
    throw e;
  } 
};

exports.findAllWithPagination = async (model,limit, page) => {
	limit = parseInt(limit || 0);
	page = parseInt(page || 0);

	if (!Number.isInteger(limit) || !Number.isInteger(page)) {
		throw  new Error("Invalid Parameters: " + 404);
	}

	const ITENS_PER_PAGE = 100;
	limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit;
	const offset = page <= 0 ? 0 : page * limit;

	try {

		const instancias = await model.findAll({ limit: limit, offset: offset });
		const quantityTotalObjects = await model.count({});
		
		const quantityPages = quantityTotalObjects > limit ? parseInt(quantityTotalObjects / limit) : 1;	

		return { quantityTotalObjects, page, quantityPages, limit, offset, instancias };

	} catch (error) {
    console.log(error);
		throw error;
	}
};
    




exports.verifyIfExistsById = async (model, id) => {
  try {
    return await model.findByPk(id);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
