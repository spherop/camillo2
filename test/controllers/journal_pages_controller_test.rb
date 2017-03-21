require 'test_helper'

class JournalPagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @journal_page = journal_pages(:one)
  end

  test "should get index" do
    get journal_pages_url
    assert_response :success
  end

  test "should get new" do
    get new_journal_page_url
    assert_response :success
  end

  test "should create journal_page" do
    assert_difference('JournalPage.count') do
      post journal_pages_url, params: { journal_page: {  } }
    end

    assert_redirected_to journal_page_url(JournalPage.last)
  end

  test "should show journal_page" do
    get journal_page_url(@journal_page)
    assert_response :success
  end

  test "should get edit" do
    get edit_journal_page_url(@journal_page)
    assert_response :success
  end

  test "should update journal_page" do
    patch journal_page_url(@journal_page), params: { journal_page: {  } }
    assert_redirected_to journal_page_url(@journal_page)
  end

  test "should destroy journal_page" do
    assert_difference('JournalPage.count', -1) do
      delete journal_page_url(@journal_page)
    end

    assert_redirected_to journal_pages_url
  end
end
