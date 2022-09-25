require "test_helper"

class BglEventsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get bgl_events_index_url
    assert_response :success
  end
end
