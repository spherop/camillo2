require 'test_helper'

class CreativeActionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @creative_action = creative_actions(:one)
  end

  test "should get index" do
    get creative_actions_url
    assert_response :success
  end

  test "should get new" do
    get new_creative_action_url
    assert_response :success
  end

  test "should create creative_action" do
    assert_difference('CreativeAction.count') do
      post creative_actions_url, params: { creative_action: { action_date: @creative_action.action_date, description: @creative_action.description, notes: @creative_action.notes, title: @creative_action.title, user_id: @creative_action.user_id } }
    end

    assert_redirected_to creative_action_url(CreativeAction.last)
  end

  test "should show creative_action" do
    get creative_action_url(@creative_action)
    assert_response :success
  end

  test "should get edit" do
    get edit_creative_action_url(@creative_action)
    assert_response :success
  end

  test "should update creative_action" do
    patch creative_action_url(@creative_action), params: { creative_action: { action_date: @creative_action.action_date, description: @creative_action.description, notes: @creative_action.notes, title: @creative_action.title, user_id: @creative_action.user_id } }
    assert_redirected_to creative_action_url(@creative_action)
  end

  test "should destroy creative_action" do
    assert_difference('CreativeAction.count', -1) do
      delete creative_action_url(@creative_action)
    end

    assert_redirected_to creative_actions_url
  end
end
