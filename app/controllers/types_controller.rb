class TypesController < ApplicationController
  def index
    @type = @type.all
  end
end
